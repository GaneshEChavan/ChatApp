/**********************************************************************************************************
 *  @Purpose        : To provide routes to each webpage operation. 
 *  @file           : backend/routes.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 26-09-2019
 *********************************************************************************************************/

const express = require("express");
const routes = new express.Router();
const controller = require("./controller/user")
const noteController = require("./controller/note")
const labelController = require("./controller/label")
const oAuthController = require("./controller/oAuth")
const collaborateController = require("./controller/collaborate")
const authenticate = require("./middleware/authentication")
const cache = require("./controller/cache")
const upload = require("./AWS_service/fileUploader")
const passport = require("passport")

routes.post('/user/register', controller.register)
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
routes.delete('/collaborator', authenticate, noteController.removeCollaborators)
/*
* update all except isTrashed
*/
routes.put('/note', authenticate, noteController.updateNote)

/*
* routes for label 
*/
routes.post('/label', authenticate, labelController.createLabel)
routes.get('/label', authenticate, labelController.readLabel)
routes.delete('/label', authenticate, labelController.deleteLabel)
routes.put('/label', authenticate, labelController.updateLabel)
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
routes.post('/note/search', authenticate, noteController.searchNote)

/**
 * add collaborator to note from existing users 
 */
// routes.post('/collaborator',authenticate,collaborateController.addCollaborator)
// routes.post('/collaborator',authenticate,collaborateController.readCollaborator)


// class Setup {
//     setup(app) {
//         /**
//         * @swagger
//         * /:
//         *   get:
//         *     description: Returns the homepage
//         *     responses:
//         *       200:
//         *         description: hello world
//         */
//         app.get('/note', authenticate, cache.notes, noteController.readNote)

//         console.log("inside swagger setup in routes")
//         // app.post('/user/register', controller.register)
//         // app.post('/user/login', cache.token, controller.login)
//     }
// }
module.exports = routes;
// module.exports.setup = function (app) {
//     /**
//       * @swagger
//       * /:
//       *   get:
//       *     description: "Returns the homepage"
//       *     responses:
//       *       200:
//       *         description: "hello world"
//      */
//     app.get('/note', authenticate, cache.notes, noteController.readNote)
    // app.post('/note/search', authenticate, noteController.searchNote)
    // app.post('/note', authenticate, noteController.createNote)
    // app.post('/user/login', cache.token, controller.login)
// }









































 //     /**
        //      * @swagger
        //      * /:
        //      *   get:
        //      *     description: Returns the homepage
        //      *     responses:
        //      *       200:
        //      *         description: hello world
        //      */
        //     app.get('/', (req, res) => {
        //       res.send('Hello World!');
        //     });
        //     **
        //  * @swagger
        //  * /user/register:
        //  * post :
        //  * description : use to register new user to applications 
        //  * responses :
        //  * '200' :
        //  * description : A successful response
        //  */
/**











// /**
//  * @swagger
//  * /customers:
//  * post :
//  * description : use to create new note
//  * responses :
//  * '200' :
//  * description : A successful response
//  */
        // app.post('/user/login', cache.token, controller.login)
        // app.post('/forgot', controller.forget)
        // app.post('/reset', authenticate, controller.reset)
        // app.post('/allUsers', authenticate, controller.activeStatus)

        // /*
        // * route for AWS-image upload
        // */
        // app.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload)

        // /*
        // * open social Authentication routes
        // */
        // // routes.get('/login',(req,res)=>{res.render('login')})
        // app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
        // app.get('/auth/google/callback', passport.authenticate('google'), oAuthController.googleLogin)
        // app.post('/auth/facebook', passport.authenticate("facebookToken", { scope: ['profile', 'email'] }), oAuthController.facebookLogin)

        // /**
        //  * @swagger
        //  * /customers:
        //  * post :
        //  * description : use to create new note
        //  * responses :
        //  * '200' :
        //  * description : A successful response
        //  */
        // app.post('/note', authenticate, noteController.createNote)
        // /**
        //  * @swagger
        //  * /customers:
        //  * get :
        //  * description : use to read all notes
        //  * responses :
        //  * '200' :
        //  * description : A successful response
        //  */
        // app.get('/note', authenticate, cache.notes, noteController.readNote)
        // app.delete('/note', authenticate, noteController.deleteNote)
        // app.delete('/collaborator',authenticate,noteController.removeCollaborators)
        // /*
        // * update all except isTrashed
        // */
        // app.put('/note', authenticate, noteController.updateNote)

        // /*
        // * routes for label 
        // */
        // app.post('/label', authenticate, labelController.createLabel)
        // app.get('/label', authenticate, labelController.readLabel)
        // app.delete('/label',authenticate, labelController.deleteLabel)
        // app.put('/label',authenticate, labelController.updateLabel)
        // /*
        // * route for listing
        // */
        // app.get('/list', authenticate, cache.list, noteController.requestedList)

        // /*
        // * route for reminder 
        // */
        // app.put('/reminder', authenticate, noteController.setReminder)

        // /*
        // * routes for delete note, empty trash and restore notes from trash 
        // */
        // app.delete('/note/trashone', authenticate, noteController.permanentDeleteNote)
        // app.delete('/note/trashAll', authenticate, noteController.emptyTrash)
        // app.put('/note/restore', authenticate, noteController.restoreNotes)

        // /*
        // * update labels to notes
        // */
        // app.post('/note/addLabel', authenticate, noteController.updateLabelToNote)
        // app.delete('/note/deleteLabel', authenticate, noteController.deleteLabelFromNote)

        // /*
        // * search note based on title,description,reminder,color 
        // */
        // app.post('/note/search', authenticate, noteController.searchNote)

        // /**
        //  * add collaborator to note from existing users 
        //  */
        // // routes.post('/collaborator',authenticate,collaborateController.addCollaborator)
        // // routes.post('/collaborator',authenticate,collaborateController.readCollaborator)

        // /**
        //  * @description : add collaborator to new or existing note from all users
        //  */