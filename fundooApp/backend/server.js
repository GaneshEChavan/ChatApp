const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongo = require("./config/dbconfig")
const Route = require("./routes")
const expressValidator = require("express-validator")
require('dotenv').config({path : __dirname + '/.env'})

// var redis = require("redis");
// var client = redis.createClient();

// client.on('error', function(err){
//     console.log('Something went wrong ', err)
// });

const app = express();

app.use(expressValidator())
app.use(bodyParser.json());
app.use('/', Route);

app.listen(process.env.PORT,()=>{
    console.log(`app listening on port ${process.env.PORT}`)
    mongo.connect
});

// git changes

module.exports = app;


