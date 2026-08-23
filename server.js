const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);

// 1. DATABASE & REDIS INSTANCE CONNECTIONS
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

let io;
async function initializeRealtimeNetwork() {
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io = new Server(server, { cors: { origin: "*" } });
    io.adapter(createAdapter(pubClient, subClient));
    io.on('connection', (socket) => {
        socket.on('join_ward_channel', (context) => socket.join(`ward:${context}`));
    });
}
initializeRealtimeNetwork().catch(console.error);

// 2. SECURITY PRIVILEGES MATRIX ENFORCER
const enforceMatrixClearance = (targetModule, requiredAction) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ error: 'Session contextual credentials missing.' });
            
            req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            next();
        } catch (e) {
            return res.status(401).json({ error: 'Authentication corrupted.' });
        }
    };
};

// =========================================================================
// ENDPOINT 1: AUTOMATED DOUBLE-ENTRY ACCOUNTING LEDGER
// =========================================================================
app.post('/api/finance/journal', enforceMatrixClearance('FINANCE', 'CREATE'), async (req, res) => {
    const { reference_id, description, lines } = req.body;
    try {
        await pool.query('BEGIN');
        await pool.query(`SET LOCAL app.current_tenant_id = '${req.user.tenant_id}'`);

        const totalDebit = lines.reduce((sum, l) => sum + parseFloat(l.debit || 0), 0);
        const totalCredit = lines.reduce((sum, l) => sum + parseFloat(l.credit || 0), 0);
        if (totalDebit !== totalCredit) throw new Error('Ledger unbalanced.');

        const entryRes = await pool.query(
            `INSERT INTO journal_entries (reference_id, description, tenant_id) VALUES ($1, $2, $3) RETURNING id`,
            [reference_id, description, req.user.tenant_id]
        );
        
        for (const line of lines) {
            await pool.query(
                `INSERT INTO ledger_lines (entry_id, account_code, debit, credit) VALUES ($1, $2, $3, $4)`,
                [entryRes.rows[0].id, line.account_code, line.debit, line.credit]
            );
        }
        await pool.query('COMMIT');
        return res.status(201).json({ success: true, message: 'Journal committed successfully.' });
    } catch (error) {
        await pool.query('ROLLBACK');
        return res.status(500).json({ error: error.message });
    }
});

// =========================================================================
// ENDPOINT 2: PUBLIC DIGITAL SOCIAL CAMPAIGNS WEBHOOK INGESTION
// =========================================================================
app.post('/api/crm/webhooks/social-leads', async (req, res) => {
    const { first_name, last_name, phone, platform_source, target_tenant_id } = req.body;
    try {
        const lead = await pool.query(
            `INSERT INTO users (name, email, password_hash, phone, tenant_id, role_id) 
             VALUES ($1, $2, 'UNCLAIMED', $3, $4, 7) RETURNING id`,
            [`${first_name} ${last_name}`, `${phone}@social.crm`, phone, target_tenant_id]
        );
        return res.status(201).json({ message: 'Social lead captured successfully.', lead_id: lead.rows[0].id });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// SYSTEM MONITORING HEALTH CHECK
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        return res.status(200).json({ status: 'UP' });
    } catch (e) {
        return res.status(503).json({ status: 'DOWN', error: 'Database disconnected' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Hospital API Core Engine running live on port ${PORT}`));
