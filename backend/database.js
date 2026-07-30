const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite file-based database
const db = new sqlite3.Database(path.join(__dirname, 'customer_requests.db'), (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Initialize schema and seed data
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS customer_requests (
        id TEXT PRIMARY KEY,
        customerName TEXT NOT NULL,
        source TEXT NOT NULL,
        requirement TEXT NOT NULL,
        importanceScore INTEGER NOT NULL,
        createdAt TEXT NOT NULL
    )
    `);

    // Seed sample data if table is empty
    db.get('SELECT COUNT(*) as count FROM customer_requests', (err, row) => {
        if (row && row.count === 0) {
            console.log('Seeding initial request data...');

            const stmt = db.prepare(`
            INSERT INTO customer_requests (id, customerName, source, requirement, importanceScore, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)
            `);

            const initialRequests = [
                ['req_001', 'Apex Logistics', 'whatsapp', 'API integration inquiry', 95, '2026-07-30T10:15:00Z'],
                ['req_002', 'GreenValley Organics', 'email', 'E-commerce platform quote', 60, '2026-07-30T09:30:00Z'],
                ['req_003', 'Starlight Retail', 'discord', 'Bug report on checkout', 85, '2026-07-30T11:00:00Z'],
                ['req_004', 'Nexus Tech Labs', 'whatsapp', 'Enterprise custom workflow inquiry', 95, '2026-07-30T09:10:00Z'],
                ['req_005', 'Urban Diner', 'sms', 'Urgent invoice update request', 75, '2026-07-30T08:45:00Z'],
                ['req_006', 'Cyber Corp', 'discord', 'General inquiry on pricing', 40, '2026-07-30T11:20:00Z']
            ];

            initialRequests.forEach(req => stmt.run(req));
            stmt.finalize();
        }
    });
});

module.exports = db;
