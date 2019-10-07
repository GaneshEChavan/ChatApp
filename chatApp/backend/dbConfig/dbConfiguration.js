const mongoose = require("mongoose");

function mongoDb() {
    mongoose.connect('mongodb://127.0.0.1:27017/chatApp', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log("could not connected to database")
        } else {

            console.log("connected to database");
        }
    })
}

module.exports = { connect: mongoDb() }
