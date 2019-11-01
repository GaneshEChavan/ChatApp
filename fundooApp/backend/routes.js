const express = require("express");
const routes = new express.Router();
const controller = require("./controller/userController")
const noteController = require("./controller/noteController")
const labelController = require("./controller/labelController")
const oAuthController = require("./controller/oAuthController")
const collaborateController = require("./controller/collaborateController")
const authenticate = require("./middleware/authentication")
const cache = require("./controller/cacheController")
const upload = require("./AWS_service/fileUploader")
const passport = require("passport")
 

/**
 * @swagger
 * /user/register:
 * post :
 * description : use to register new user to applications 
 * responses :
 * '200' :
 * description : A successful response
 */
routes.post('/user/register', controller.register)
/**
 * @swagger
 * /customers:
 * post :
 * description : use to create new note
 * responses :
 * '200' :
 * description : A successful response
 */
routes.post('/user/login', cache.token, controller.login)
routes.post('/forgot', controller.forget)
routes.post('/reset', authenticate, controller.reset)
routes.post('/allUsers', authenticate, controller.activeStatus)

/*
* route for AWS-image upload
*/
routes.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload)

/*
* open social Authentication routes
*/
// routes.get('/login',(req,res)=>{res.render('login')})
routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
routes.get('/auth/google/callback', passport.authenticate('google'), oAuthController.googleLogin)
routes.post('/auth/facebook', passport.authenticate("facebookToken", { scope: ['profile', 'email'] }), oAuthController.facebookLogin)

/**
 * @swagger
 * /customers:
 * post :
 * description : use to create new note
 * responses :
 * '200' :
 * description : A successful response
 */
routes.post('/note', authenticate, noteController.createNote)
/**
 * @swagger
 * /customers:
 * get :
 * description : use to read all notes
 * responses :
 * '200' :
 * description : A successful response
 */
routes.get('/note', authenticate, cache.notes, noteController.readNote)
routes.delete('/note', authenticate, noteController.deleteNote)
/*
* update all except isTrashed
*/
routes.put('/note', authenticate, noteController.updateNote)

/*
* routes for label 
*/
routes.post('/label', authenticate, labelController.createLabel)
routes.get('/label', authenticate, labelController.readLabel)
routes.delete('/label', labelController.deleteLabel)
routes.put('/label', labelController.updateLabel)
/*
* route for listing
*/
routes.get('/list', authenticate, cache.list, noteController.requestedList)

/*
* route for reminder 
*/
routes.put('/reminder', authenticate, noteController.setReminder)

/*
* routes for delete note, empty trash and restore notes from trash 
*/
routes.delete('/note/trashone', authenticate, noteController.permanentDeleteNote)
routes.delete('/note/trashAll', authenticate, noteController.emptyTrash)
routes.put('/note/restore', authenticate, noteController.restoreNotes)

/*
* update labels to notes
*/
routes.post('/note/addLabel', authenticate, noteController.updateLabelToNote)
routes.delete('/note/deleteLabel', authenticate, noteController.deleteLabelFromNote)

/*
* search note based on title,description,reminder,color 
*/
routes.get('/note/search', authenticate, noteController.searchNote)

/**
 * add collaborator to note from existing users 
 */
routes.post('/collaborator',authenticate,collaborateController.addCollaborator)
routes.post('/collaborator',authenticate,collaborateController.readCollaborator)

/**
 * @description : add collaborator to new or existing note from all users
 */

module.exports = routes