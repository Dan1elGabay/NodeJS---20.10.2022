const express = require('express')
const router = express.Router()
const db = require('../db/pool.js'); // db is a connection pool


router.get('/', function (req, res) {
    db.query('SELECT Id,courseName,price FROM courses', async function(err, rows, fields) {
        console.log(`[v] Fetched ${rows.length} rows`);
        res.json(rows);
    });
});


module.exports = router;