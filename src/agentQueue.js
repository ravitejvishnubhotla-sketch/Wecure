const { Queue, Worker } = require('bullmq');
const { OpenAI } = require('openai');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Redis connection for task persistence
const redisConfig = { url: process.env.REDIS_URL };
const clinicalAgentQueue = new Queue('clinical-agent-queue', { connection: redisConfig });

// Tool: Query Bed Availability
async function getAvailableBeds(wardType) {
    const { rows } = await pool.query(
        "SELECT id, bed_code, ward_name FROM beds WHERE status = 'AVAILABLE' AND department = $1 LIMIT 3",
        [wardType]
    );
    return rows;
}

// Tool: Auto-Assign Bed
async function reserveBed(bedId, patientName) {
    await pool.query(
        "UPDATE beds SET status = 'OCCUPIED', patient_name = $1, updated_at = NOW() WHERE id = $2",
        [patientName, bedId]
    );
    return { success: true, bedId, patientName };
}

// Dedicated Multi-Agent Worker
const agentWorker = new Worker('clinical-agent-queue', async (job) => {
    const { agentType, payload } = job.data;
    console.log(`[AI AGENT RUNNING]: ${agentType} for Job #${job.id}`);

    if (agentType === 'TRIAGE_AND_ALLOCATE') {
        const { patientName, code, vitals } = payload;

        // Structured Tool Calling with LLM
        const prompt = `You are the Chief Emergency Triage AI. Patient: ${patientName}, Code: ${code}, Vitals: ${JSON.stringify(vitals)}. Decide immediate protocol, necessary ward, and bed reservation.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'getAvailableBeds',
                        description: 'Fetch open beds in a specific hospital department',
                        parameters: {
                            type: 'object',
                            properties: { wardType: { type: 'string', enum: ['CARDIAC', 'NEURO', 'MAIN', 'KIDS'] } },
                            required: ['wardType']
                        }
                    }
                },
                {
                    type: 'function',
                    function: {
                        name: 'reserveBed',
                        description: 'Reserve a specific bed for the incoming critical patient',
                        parameters: {
                            type: 'object',
                            properties: {
                                bedId: { type: 'number' },
                                patientName: { type: 'string' }
                            },
                            required: ['bedId', 'patientName']
                        }
                    }
                }
            ],
            tool_choice: 'auto'
        });

        const choice = response.choices[0].message;
        let actionResult = null;

        // Execute function calls autonomously
        if (choice.tool_calls) {
            for (const toolCall of choice.tool_calls) {
                const args = JSON.parse(toolCall.function.arguments);
                if (toolCall.function.name === 'getAvailableBeds') {
                    actionResult = await getAvailableBeds(args.wardType);
                } else if (toolCall.function.name === 'reserveBed') {
                    actionResult = await reserveBed(args.bedId, args.patientName);
                }
            }
        }

        // Persist the Agent Reasoning Log in Supabase
        await pool.query(
            `INSERT INTO ai_clinical_logs (agent_type, prompt_context, ai_recommendation, confidence_score)
             VALUES ($1, $2, $3, 0.98)`,
            [agentType, JSON.stringify(vitals), choice.content || 'Autonomous Bed Reserved']
        );

        return { success: true, actionResult, reasoning: choice.content };
    }
}, { connection: redisConfig });

module.exports = { clinicalAgentQueue };
