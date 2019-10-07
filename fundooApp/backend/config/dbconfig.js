const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join( __dirname ,'../.env') })




module.exports = {
    
    connect: mongoose.connect(`${process.env.MONGO}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log("Unable to connect to database")
        } else {
            console.log("Connected to database");

        }
    })
}