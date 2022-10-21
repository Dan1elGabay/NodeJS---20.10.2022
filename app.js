//* === express ===

//* require and activate express
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql')

//* static
app.use(express.static('./public'))



//* === handle different routes ===
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
    res.status(200).send('Your are good to go')
})


//* === run the server (on port 5000) ===

app.listen(5000, () => {
    console.log('Server is running on port 5000 ⚽');
})



