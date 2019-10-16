const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongo = require("./config/dbconfig")
const Route = require("./routes")
const expressValidator = require("express-validator")
const passportGoogle = require("./authServices/oAuthGoogle")
const passportFacebook = require("./authServices/oAuthFacebook")
const passport = require("passport")
require('dotenv').config({path : __dirname + '/.env'})


const app = express();

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('home')
})

app.use(expressValidator())

app.use(passport.initialize())
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use(bodyParser.json());
app.use('/', Route);

app.listen(process.env.PORT,()=>{
    console.log(`app listening on port ${process.env.PORT}`)
    mongo()
});


module.exports = app;


