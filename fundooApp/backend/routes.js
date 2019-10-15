const express = require("express");
const routes = new express.Router();
const controller = require("./controller/userController")
const authenticate = require("./middleware/authentication")
const cache = require("./middleware/cache")
const upload = require("./middleware/fileUploader")
const passport = require("passport")

routes.post('/register', controller.register)

routes.post('/login', cache, controller.login)

routes.post('/forgot', controller.forget)

routes.post('/reset', authenticate, controller.reset)

routes.post('/allUsers', authenticate, controller.allUsers)

routes.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload)

routes.get('/login',(req,res)=>{
    res.render('login')
})

routes.get('/auth/google',passport.authenticate('google',{ scope : ['profile','email'] }))

routes.get('/auth/google/callback',passport.authenticate('google'),
 controller.googleLogin
// (req,res)=>{
//     console.log(req.user);
//     console.log(req.user.emails[0].value);
//     res.send("you reached callback URL")
// }
)

module.exports = routes