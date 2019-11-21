/******************************************************************************
 *  @Purpose        : To create a server to connect with front end for getting 
                    request and sending response to client
 *  @file           : server.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 26-09-2019
 ******************************************************************************/

/**
 * @description:required all the necessary files and modules
 */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongo = require("./config/dbconfig");
const Route = require("./routes");
const expressValidator = require("express-validator");
const passportGoogle = require("./authServices/oAuthGoogle");
const passportFacebook = require("./authServices/oAuthFacebook");
require("./msg-que/msgQPublisher").producer()
require('./msg-que/msgQSubscriber').sendEmail()
// consumer.sendEmail()
const passport = require("passport");
require("./elastic-search/elasticSearch");
require("dotenv").config({ path: __dirname + "/.env" });
const logger = require("../logger/logger");

const app = express();
app.set("view engine","ejs");
// app.get('/',(req,res)=>{
//     res.render("login",{ name: ganesh, url: "localhost:3000" })
// })
// app.get("/", function (req, res) {
//   res.render(, );
// });

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(expressValidator());

app.use(passport.initialize());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", Route);

app.use(function (err, req, res, next) {
    logger.error(`check for request body json ${err.stack}`);
    res.status(400).send({ "Error": "Bad Request..!" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    mongo();
});


module.exports = app;


// 





// /**** Setting up the CORS for app */
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || '*')
//   res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD")
//   if ('OPTIONS' === req.method) {
//     res.sendStatus(200)
//   } else {
//     next()
//   }
// })