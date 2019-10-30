const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongo = require("./config/dbconfig")
const Route = require("./routes")
const expressValidator = require("express-validator")
const passportGoogle = require("./authServices/oAuthGoogle")
const passportFacebook = require("./authServices/oAuthFacebook")
const passport = require("passport")
require('dotenv').config({ path: __dirname + '/.env' })
const logger = require("../logger/logger")

console.log(`${__dirname}`);

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc")
// const swaggerDocument = require("./swagger.json")
const options = {
  definition: {
    info: {
      title: 'Node-Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful-API with Swagger',
      contact : {
       name : 'BridgeLabz'
      }
    },
    host: 'http://localhost:3000'
  },
  apis: ["./routes.js"]

}
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/api-docs.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });
// /**
//  * @swagger
//  *
//  * /login:
//  *   post:
//  *     description: Login to the application
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: username
//  *         description: Username to use for login.
//  *         in: formData
//  *         required: true
//  *         type: string
//  *       - name: password
//  *         description: User's password.
//  *         in: formData
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: login
//  */
// app.post('/login', (req, res) => {
//   res.status(200).send("swagger implemented")
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

app.use(bodyParser.json());
app.use('/', Route);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
  mongo()
});


module.exports = app;


// app.set('view engine','ejs')
// app.get('/',(req,res)=>{
//     res.render('home')
// })