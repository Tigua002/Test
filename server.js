// Load all necessary Node.js modules
require("dotenv").config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Dataspot port: ${PORT}`));


// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mysql = require('mysql2');
// Test database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
});
connection.connect()




app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.use(express.static("public"));