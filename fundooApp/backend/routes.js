const express = require("express");
const routes = new express.Router();
const controller = require("./controller/userController")
const noteController = require("./controller/noteController")
const authenticate = require("./middleware/authentication")
const cache = require("./cacheService/cache")
const upload = require("./AWS_service/fileUploader")
const passport = require("passport")
/*
* User routes
*/
routes.post('/register', controller.register)
routes.post('/login', cache, controller.login)
routes.post('/forgot', controller.forget)
routes.post('/reset', authenticate, controller.reset)
routes.post('/allUsers', authenticate, controller.allUsers)
routes.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload)

/*
* open social Authentication routes
*/
routes.get('/login',(req,res)=>{res.render('login')})
routes.get('/auth/google',passport.authenticate('google',{ scope : ['profile','email'] }))
routes.get('/auth/google/callback',passport.authenticate('google'),controller.googleLogin)
routes.get('/auth/facebook',passport.authenticate("facebookToken",{ scope : ['profile','email'] }),controller.facebookLogin)

/*
* notes routes
*/
routes.post('/createNote'
// ,authenticate
,noteController.createNote)

module.exports = routes