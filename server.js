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

// CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

const server = http.createServer(app);

// 1. POOL & REDIS INITIALIZATION
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

let io;
async function initializeServices() {
    try {
        if (process.env.REDIS_URL) {
            const pubClient = createClient({ url: process.env.REDIS_URL });
            const subClient = pubClient.duplicate();
            await Promise.all([pubClient.connect(), subClient.connect()]);
            io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
            io.adapter(createAdapter(pubClient, subClient));
            console.log('Redis Pub/Sub Realtime Adapter Mounted.');
        } else {
            io = new Server(server, { cors: { origin: "*" } });
        }
        io.on('connection', (socket) => {
            socket.on('join_ward', (ward) => socket.join(`ward:${ward}`));
        });
    } catch (e) {
        console.warn('Realtime falling back to in-memory Socket.io:', e.message);
        io = new Server(server, { cors: { origin: "*" } });
    }
}
initializeServices();

// 2. AUTHENTICATION MIDDLEWARE
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Session credentials missing.' });
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'a_deeply_secure_production_hash_generation_secret');
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Session expired or invalid.' });
    }
};

// 3. AUTHENTICATION ROUTE
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = `
            SELECT u.id, u.name, u.email, u.password_hash, u.tenant_id, r.role_name, r.modules
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.email = $1
        `;
        const { rows } = await pool.query(query, [email]);
        if (rows.length === 0 || rows[0].password_hash !== password) {
            return res.status(401).json({ error: 'Invalid healthcare credentials.' });
        }
        const user = rows[0];
        const token = jwt.sign(
            { id: user.id, tenant_id: user.tenant_id, role: user.role_name, name: user.name },
            process.env.JWT_SECRET || 'a_deeply_secure_production_hash_generation_secret',
            { expiresIn: '24h' }
        );

        res.cookie('auth_token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        return res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role_name, mods: user.modules }
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// 4. BED TELEMETRY ROUTES
app.get('/api/beds', authenticate, async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM beds WHERE tenant_id = $1 ORDER BY id ASC', [req.user.tenant_id]);
        return res.json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.post('/api/beds/:id/status', authenticate, async (req, res) => {
    const { nextStatus } = req.body;
    try {
        const result = await pool.query(
            'UPDATE beds SET status = $1, updated_at = NOW() WHERE id = $2 AND tenant_id = $3 RETURNING *',
            [nextStatus, req.params.id, req.user.tenant_id]
        );
        const updatedBed = result.rows[0];
        if (io) io.emit('bed_status_updated', updatedBed);
        return res.json(updatedBed);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// 5. ADMISSIONS (ADT) + AUTOMATED GENERAL LEDGER HOOK
app.post('/api/admissions', authenticate, async (req, res) => {
    const { patient_id, bed_id, deposit_amount } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [req.user.tenant_id]);

        // 1. Create Admission Record
        const admRes = await client.query(
            `INSERT INTO admissions (tenant_id, patient_id, bed_id, attending_doctor_id, deposit_amount)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.user.tenant_id, patient_id, bed_id, req.user.id, deposit_amount || 0]
        );

        // 2. Lock Bed as OCCUPIED
        const patientRes = await client.query('SELECT first_name, last_name FROM patients WHERE id = $1', [patient_id]);
        const patientName = `${patientRes.rows[0].first_name} ${patientRes.rows[0].last_name}`;

        await client.query(
            'UPDATE beds SET status = $1, patient_name = $2, updated_at = NOW() WHERE id = $3 AND tenant_id = $4',
            ['OCCUPIED', patientName, bed_id, req.user.tenant_id]
        );

        // 3. Post Automatic Double-Entry Ledger Entry if deposit exists
        if (deposit_amount && deposit_amount > 0) {
            const jRes = await client.query(
                `INSERT INTO journal_entries (tenant_id, reference_id, description)
                 VALUES ($1, $2, $3) RETURNING id`,
                [req.user.tenant_id, `ADM-${admRes.rows[0].id.slice(0, 8)}`, `Inpatient Admission Deposit - ${patientName}`]
            );

            // DEBIT: 1010-CASH (Asset increases)
            await client.query(
                `INSERT INTO ledger_lines (entry_id, account_code, debit, credit) VALUES ($1, '1010-CASH', $2, 0)`,
                [jRes.rows[0].id, deposit_amount]
            );
            // CREDIT: 2010-PATIENT-DEPOSIT (Liability/Escrow increases)
            await client.query(
                `INSERT INTO ledger_lines (entry_id, account_code, debit, credit) VALUES ($1, '2010-PATIENT-DEPOSITS', 0, $2)`,
                [jRes.rows[0].id, deposit_amount]
            );
        }

        await client.query('COMMIT');
        if (io) io.emit('bed_status_updated', { id: bed_id, status: 'OCCUPIED', patient_name: patientName });
        return res.status(201).json({ success: true, admission: admRes.rows[0] });
    } catch (e) {
        await client.query('ROLLBACK');
        return res.status(500).json({ error: e.message });
    } finally {
        client.release();
    }
});

// 6. LABORATORY ORDERS & OBSERVATIONS (LIS)
app.get('/api/labs/orders', authenticate, async (req, res) => {
    try {
        const query = `
            SELECT o.id, o.test_code, o.test_name, o.priority, o.status, o.created_at,
                   p.uhid, p.first_name, p.last_name,
                   COALESCE(json_agg(r.*) FILTER (WHERE r.id IS NOT NULL), '[]') as results
            FROM lab_orders o
            JOIN patients p ON o.patient_id = p.id
            LEFT JOIN lab_results r ON o.id = r.order_id
            WHERE o.tenant_id = $1
            GROUP BY o.id, p.uhid, p.first_name, p.last_name
            ORDER BY o.created_at DESC
        `;
        const { rows } = await pool.query(query, [req.user.tenant_id]);
        return res.json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// 7. FINANCIAL LEDGERS QUERY
app.get('/api/finance/trial-balance', authenticate, async (req, res) => {
    try {
        const query = `
            SELECT l.account_code, SUM(l.debit) as total_debit, SUM(l.credit) as total_credit,
                   (SUM(l.debit) - SUM(l.credit)) as net_balance
            FROM ledger_lines l
            JOIN journal_entries j ON l.entry_id = j.id
            WHERE j.tenant_id = $1
            GROUP BY l.account_code
            ORDER BY l.account_code ASC
        `;
        const { rows } = await pool.query(query, [req.user.tenant_id]);
        return res.json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// HEALTH CHECK
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        return res.json({ status: 'UP', service: 'Wecure Central Engine' });
    } catch (e) {
        return res.status(503).json({ status: 'DOWN', error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Wecure Unified Hospital Engine running on port ${PORT}`));
