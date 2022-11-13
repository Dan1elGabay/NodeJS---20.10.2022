//* === express, cors, body-parser ===

//* require and activate express
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// *console.log(process.env.SERVER_PORT);


//* static folder
app.use(express.static('./public/asset'))


//* ===  Cors-handle different routes ===
const cors = require('cors');
app.use(cors());


//* === body-parser (npm package) ===
const bodyParser = require('body-parser');
//* enable express to parse html FORM data inside the request body
app.use(bodyParser.urlencoded({
    extended: false
}));
//* enable express to parse json data inside the request body
app.use(bodyParser.json());




//* handle GET request to '/' root folder
app.get('/', (req, res) => {
    console.log('New GET request entered 🚩');
    res.status(200).sendFile(path.join(__dirname, './public/asset/index.html'));
})

app.get('/courses', (req, res) => {
    console.log('New GET request entered 🚩');
    res.status(200).sendFile(path.join(__dirname, './public/asset/courses.html'));
})

const courseRouts = require('./routs/course.routs');
app.use('/api/courses',courseRouts)



//* === run the server (on port 5000) ===
app.listen(5000, () => {
    console.log(`\n =======${new Date().toDateString()}=======`);
    console.log('Server is running on port http://localhost:5000 ⚽');
})

