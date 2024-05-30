const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const app = express();
const session = require('express-session')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { query } = require('express');
const saltRounds = 10;
const path = require('path')
const multer = require("multer");
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
// app.use('/Images', express.static('Images'));

const emailValidator = require('email-validator');

const isValidEmail = emailValidator.validate('example@email.com');

app.set('trust proxy', true);


app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));




app.get('/api/get', (req, res) => {
  
    res.send("working");

});



app.get('/api', (req, res) => {
  const ip = req.ip; // This will retrieve the IP address of the client
  res.send(`Your IP address is: ${ip}`);
});
 

app.listen(3001);
