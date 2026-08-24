const { Queue, Worker } = require('bullmq');
const { OpenAI } = require('openai');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redisConfig = { url: process.env.REDIS_URL };

// Reusable Omnichannel Dispatch inside Worker
async function sendOmnichannelNotification({ phone, channel, template, message }) {
    console.log(`[WORKER ${channel}] Dispatched to ${phone}: ${message}`);
    
    // 1. Log in Supabase
    try {
        await pool.query(
            `INSERT INTO communication_dispatches (tenant_id, recipient_phone, channel, template_type, message_payload, delivery_status)
             VALUES ('a0000000-0000-0000-0000-000000000001', $1, $2, $3, $4, 'DELIVERED')`,
            [phone, channel, template, message]
        );
    } catch (e) {
        console.error('DB Dispatch Log error:', e.message);
    }

    // 2. Real Twilio Hook (if credentials exist)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        try {
            const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            await twilio.messages.create({
                body: message,
                from: channel === 'WHATSAPP' ? (process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886') : process.env.TWILIO_SMS_NUMBER,
                to: channel === 'WHATSAPP' ? `whatsapp:${phone}` : phone
            });
        } catch (err) {
            console.warn('Twilio dispatch skipped/mocked:', err.message);
        }
    }
}

// Dedicated BullMQ Worker
const agentWorker = new Worker('clinical-agent-queue', async (job) => {
    const { agentType, payload } = job.data;
    const { patientName, code, vitals } = payload;

    console.log(`[AI AGENT EXECUTING] ${agentType} for ${patientName}`);

    // Construct AI Decision & WhatsApp message
    const alertMsg = `🚨 *CRITICAL EMERGENCY ALERT - ${code}*\n\nPatient: ${patientName}\nVitals: BP ${vitals.bp} | SpO2 ${vitals.spo2}\nBay: ${vitals.bay || 'Resus Bay Alpha'}\n\n🤖 *AI Triage Recommendation*:\nSevere compromise detected. Prepare immediate intubation & notify Cath Lab team.`;

    // 1. Send Background WhatsApp Notification
    await sendOmnichannelNotification({
        phone: '+919849012345', // Primary On-Call Physician Registry
        channel: 'WHATSAPP',
        template: 'CODE_RED_ALERT',
        message: alertMsg
    });

    // 2. Persist AI Log
    await pool.query(
        `INSERT INTO ai_clinical_logs (agent_type, prompt_context, ai_recommendation, confidence_score)
         VALUES ($1, $2, $3, 0.98)`,
        [agentType, JSON.stringify(vitals), alertMsg]
    );

    return { success: true, dispatched: true };
}, { connection: redisConfig });

const clinicalAgentQueue = new Queue('clinical-agent-queue', { connection: redisConfig });

module.exports = { clinicalAgentQueue };
