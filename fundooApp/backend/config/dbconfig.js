const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '../.env') })

module.exports = function dbConnection() {

    mongoose.connect(`${process.env.MONGO}`, {
        /**
         * @description: DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, 
         *               and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
         *               pass option { useUnifiedTopology: true } and { useNewUrlParser: true } to the MongoClient constructor
         */
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log("Unable to connect to database")
        } else {
            console.log("Connected to database");

        }
    })
    mongoose.connection.on('connected', function () {
        console.log("Mongoose default connection is open to ", process.env.MONGO);
    });

    mongoose.connection.on('error', function (err) {
        console.log("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Mongoose default connection is disconnected");
    });

}