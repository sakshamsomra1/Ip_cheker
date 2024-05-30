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
const dns = require('dns');
const emailValidator = require('email-validator');

const isValidEmail = emailValidator.validate('example@email.com');

app.set('trust proxy', true);


app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ["https://calendar-lime-seven.vercel.app"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));




app.get('/api/get', (req, res) => {
  
    res.send("working");

});

app.get('/api/ip', (req, res) => {
 // const clientIP = req.connection.remoteAddress;
 //  const referringWebsite = req.get('Referer') || 'Direct API Call';
  
 //  res.send(`The client's IP address is: ${clientIP}. You are accessing the API from: ${referringWebsite}`);

  // const ip = req.ip;
  // const referringWebsite = req.get('Referer') || 'Direct API Call';
  
  // res.send(`Your IP address is: ${ip}. You are accessing the API from: ${referringWebsite}`);


  const clientIP = req.header('X-Forwarded-For') || req.connection.remoteAddress;
  const referringWebsite = req.get('Referer') || 'Direct API Call';

  if(referringWebsite == 'Direct API Call'){
    const result = {
        clientIP: clientIP,
        
      };
      res.json(result);
    
  }
  
  // Extract the domain from the referring website URL
  const referringDomain = referringWebsite ? new URL(referringWebsite).hostname : '';

  // Resolve the IP address of the referring domain
  dns.lookup(referringDomain, (err, address) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error resolving IP address of referring website');
    } else {
      const result = {
        clientIP: clientIP,
        referringWebsite: referringWebsite,
        referringWebsiteIP: address
      };
      res.json(result);
    }
  });
});



app.get('/api', (req, res) => {
  const ip = req.ip; // This will retrieve the IP address of the client
  res.json(`${ip}`);
});
 

app.listen(3001);
