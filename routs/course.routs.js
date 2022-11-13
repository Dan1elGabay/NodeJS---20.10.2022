const {
    query
} = require('express');
const express = require('express')
const router = express.Router()
const db = require('../db/pool.js'); // db is a connection pool


//* BASE PATH = /api/courses

//* Route: GET: get all courses

router.get('/', function (req, res) {
    console.log(req.method + " " + req.baseUrl + req.path);
    db.query('SELECT * FROM courses WHERE Deleted=0 ', async function (err, rows, fields) {

        if (err) {
            console.log(`[X] Error fetching records`);
            res.status(500).json({
                error: `${err}`
            })
            return
        }
        console.log(`💡 Fetched ${rows.length} rows`);
        res.status(200).json(rows);
    });
});


//* Delete course by id

router.delete('/:id', function (req, res) {
    console.log('[+] DELETE ' + req.baseUrl + req.path);
    db.query(`UPDATE courses SET Deleted=1 WHERE Id=${parseInt(req.params.id)}`, function(err, rows, fields) {
        
        if(err) {
            console.log(`    [X] Error deleting record (ID:${req.params.id})`);
            res.status(500).json({error: `Error deleting record (ID:${req.params.id})`});
            return;
        }

        console.log(`    [v] Successfully deleted one record (ID:${req.params.id})`);
        res.status(200).json({message: `Successfully deleted one record (ID:${req.params.id})`})
    });
});

//* Create new course

router.post('/', function (req, res) {
    console.log(req.method + " " + req.baseUrl + req.path);
   
    const query = `INSERT INTO courses (courseName, description, duration, price, Deleted) VALUES ('${req.body.courseName}', '${req.body.description}','${req.body.duration}',${req.body.price}, 0)`

    const query2 = 'INSERT INTO courses (courseName, description, duration, price, Deleted) VALUES (?,?,?,?,?)' //['one',99,'two','']

    const query3 = 'INSERT INTO courses SET ?' //req.body

    // insert after query array or req.body

    db.query(query, async function (err, rows, fields) {

        if (err) {
            console.log(`[X] Error fetching records`);
            res.status(500).json({
                error: `${err}`
            })
            return
        }
        if (rows.length===0) {
            res.status(404).json({message: `Successfully adding ${rows.affectedRows} ${rows.affectedRows<1? 'rows':'row'} to the table`})
            return
        }
        console.log(`💡 Successfully row number ${rows.insertId} has been added to data base`);
        res.status(200).json({message: `Successfully adding ${rows.affectedRows} ${rows.affectedRows<1? 'rows':'row'} to the table`});    
        



        
    });

});


//* UPDATE record by ID

router.put('/:id', function (req, res) {
    console.log(req.method + " " + req.baseUrl + req.path);
    const query = `UPDATE courses SET ? WHERE Id=${parseInt(req.params.id)}`
const data = req.body
    db.query(query,data, async function (err, rows, fields) {

        if (err) {
            console.log(`[X] Error fetching records`);
            res.status(500).json({
                error: `${err}`
            })
            return
        }
        if (rows.affectedRows===0) {
            console.log(`[X] Error updating records`);
            res.status(500).json({
                error: `Couldn't find course : ${parseInt(req.params.id)}`})
                return
        }
        console.log(`💡 Successfully row number ${req.params.id} has been updated`);
        res.status(200).json({message: `Successfully updating ${rows.affectedRows} ${rows.affectedRows<1? 'rows':'row'} to the table`});    
        
        
    });

});

//* Route: GET: specific course

router.get('/:id', function (req, res) {
    console.log(req.method + " " + req.baseUrl + req.path);
    db.query(`SELECT * FROM courses WHERE Deleted=0 AND Id=${parseInt(req.params.id)}`, async function (err, rows, fields) {

        if (err) {
            console.log(`[X] Error fetching records`);
            res.status(500).json({
                error: `${err}`
            })
            return
        }
        console.log(`💡 Fetched ${rows.length} ${rows.length<1? 'rows':'row'} to the table`);
        res.status(200).json(rows);
    });
});

module.exports = router;
