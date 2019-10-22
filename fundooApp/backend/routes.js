const express = require("express");
const routes = new express.Router();
const controller = require("./controller/userController")
const noteController = require("./controller/noteController")
const labelController = require("./controller/labelController")
const oAuthController = require("./controller/oAuthController")
const authenticate = require("./middleware/authentication")
const cache = require("./cacheService/cache")
const upload = require("./AWS_service/fileUploader")
const passport = require("passport")
/*
* User routes
*/
routes.post('/user/register', controller.register)
routes.get('/user/login', cache, controller.login)
routes.post('/forgot', controller.forget)
routes.post('/reset', authenticate, controller.reset)
routes.post('/allUsers', authenticate, controller.allUsers)

/*
* route for AWS-image upload
*/
routes.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload)

/*
* open social Authentication routes
*/
// routes.get('/login',(req,res)=>{res.render('login')})
routes.get('/auth/google',passport.authenticate('google',{ scope : ['profile','email'] }))
routes.get('/auth/google/callback',passport.authenticate('google'),oAuthController.googleLogin)
routes.get('/auth/facebook',passport.authenticate("facebookToken",{ scope : ['profile','email'] }),oAuthController.facebookLogin)

/*
* routes for notes 
*/
routes.post('/note',authenticate,noteController.createNote)
routes.get('/note',authenticate,cache,noteController.readNote)
routes.delete('/note',authenticate,noteController.deleteNote)
routes.put('/note',authenticate,noteController.updateNote)

/*
* routes for label 
*/
routes.post('/label',authenticate,labelController.createLabel)
routes.get('/label',authenticate,labelController.readLabel)
routes.delete('/label',labelController.deleteLabel)
routes.put('/label',labelController.updateLabel)
/*
* route for pagination
*/
routes.get('/list',authenticate,noteController.requestedList)

/*
* route for reminder 
*/
routes.put('/reminder',authenticate,noteController.setReminder)

/*
* routes for delete note, empty trash and restore notes from trash 
*/
routes.delete('/note/trashone',authenticate,noteController.permanentDeleteNote)
routes.delete('/note/trashAll',authenticate,noteController.emptyTrash)
routes.put('/note/restore',authenticate,noteController.restoreNotes)

/*
* update labels to notes
*/
routes.post('/note/addLabel',authenticate,noteController.updateLabelToNote)
routes.delete('/note/deleteLabel',authenticate,noteController.deleteLabelFromNote)

/*
* search note based on title,description,reminder,color 
*/
routes.get('/note/search',authenticate,noteController.searchNote)

module.exports = routes