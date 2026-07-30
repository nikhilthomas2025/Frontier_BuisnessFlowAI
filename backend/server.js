const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Enable Cross-Origin Resource Sharing (CORS) for React frontend integration
app.use(cors());
app.use(express.json());

/**
 * GET /api/v1/leads
 * Supports optional filtering by source query param: /api/v1/leads?source=whatsapp
 */
app.get('/api/v1/leads', (req, res) => {
    const { source } = req.query;

    let query = 'SELECT * FROM customer_requests';
    const params = [];

    if (source) {
        query += ' WHERE LOWER(source) = LOWER(?)';
        params.push(source);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
