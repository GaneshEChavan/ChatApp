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
const mongo = require("./config/dbconfig")
const Route = require('./routes')
const expressValidator = require("express-validator")
const passportGoogle = require("./authServices/oAuthGoogle")
const passportFacebook = require("./authServices/oAuthFacebook")
const passport = require("passport")
require('dotenv').config({ path: __dirname + '/.env' })
const logger = require("../logger/logger")
/**
 * @description: created express app to 
 */
const app = express();

const swaggerUi = require("swagger-ui-express");
// const swaggerJSDoc = require("swagger-jsdoc")
// // const swaggerDocument = require("./swagger.json")
// const swaggerDefinition = {
//     info: {
//       title: 'Node-Swagger API',
//       version: '1.0.0',
//       description: 'Demonstrating how to describe a RESTful-API with Swagger',
//       contact : {
//        name : 'BridgeLabz'
//       }
//     },
//     host: 'http://localhost:3000',
//   basePath: '/', // Base path (optional)
// };

// const options = {
//   swaggerDefinition,
//   // definition: {
//   //   info: {
//   //     title: 'Node-Swagger API',
//   //     version: '1.0.0',
//   //     description: 'Demonstrating how to describe a RESTful-API with Swagger',
//   //     contact : {
//   //      name : 'BridgeLabz'
//   //     }
//   //   },
//   //   host: 'http://localhost:3000',
//   //   basePath: '/',
//   // },
//   apis: [ "../backend/routes.js"] //, './parameters.yaml']
// }

// const swaggerSpec = swaggerJSDoc(options);
// // console.log(JSON.stringify(swaggerSpec))
// app.get('/api-docs.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Route.test()

// Route.setup(app);
// routes.setup(app);


// app.get('/api-docs.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

  // const swaggerUi = require('swagger-ui-express');
  // const swaggerDocument = require('../swagger/swagger.json');
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  
  app.use(expressValidator())
  
  app.use(passport.initialize())
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use('/', Route);
  
  app.use(function(err,req,res,next) {
    console.log("check for request body json");
    logger.error(err.stack);
    res.status(400).send({"Error" : "Bad Request..!"});
  });
  
  app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
    mongo()
  });
  
  
module.exports = app;


// app.set('view engine','ejs')
// app.get('/',(req,res)=>{
//     res.render('home')
// })




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