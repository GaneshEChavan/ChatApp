/*****************************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : controller/noteController.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 *****************************************************************************************/

const noteService = require("../service/note")

/**
 * @description: controller class to control all the incoming requests and send back response
 */
class ControllerNote {
    /**
     * @description: function to create note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    createNote(req, res) {
        let response = {};
        try {
            
            let noteData = {
                userID: req.decoded._id,
                title: req.body.title,
                description: req.body.description,
                color: req.body.color
            }
            let colab = {
                collaborators : req.body.collaborators
            }
            /**
             * @description : calling service to create note
             */
            noteService.newNote(noteData,colab).then((data) => {
                response.status = true;
                response.message = "Note Created successfully..!";
                response.data = data;
                res.status(201).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Unable to create note..!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something went wrong";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to read all notes
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    readNote(req, res) {
        let response = {}
        try {
            let user = {
                userID: req.decoded._id
            }
            noteService.userNotes(user).then((data) => {
                response.status = true;
                response.message = "showing all notes of user...!";
                response.data = data;
                res.status(202).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server Error";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (error) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to delete specific note and add to trash
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    deleteNote(req, res) {
        let response = {}
        try {
            req.checkBody("_id", "note id must be provided to refer").notEmpty()
            let noteId = {
                userID: req.decoded._id,
                _id: req.body._id,
                isTrashed: req.body.isTrashed
            }
            noteService.addToTrash(noteId).then((data) => {
                response.status = true;
                response.message = "Note deleted and added to trash...!";
                response.data = data;
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "unable to delete note...!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to remove collaborators from note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    removeCollaborators(req,res){
       let response = {}
       try{
        //    console.log("req body",req.body);
           
        noteService.colaboratorRemove(req.body).then(data=>{
            response.status = true;
            response.message = "Successfully updated Notes...!";
            response.data = data;
            res.status(200).send(response)
        }).catch(err=>{
            response.status = false;
            response.message = "Server Error...!";
            response.error = err;
            res.status(500).send(response)
        })
       }catch(err){
        response.status = false;
        response.message = "Server Error...!";
        response.error = err;
        res.status(500).send(response)
       }
    }

    /**
     * @description: function to update specific note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    updateNote(req, res) {
        let response = {}
        try {
            noteService.noteChanges(req.body).then((data) => {
                response.status = true;
                response.message = "changes made to notes...!";
                response.data = data;
                res.status(202).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server error...!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to delete specific note from trash
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    permanentDeleteNote(req, res) {
        let response = {}
        try {
            let noteid = {
                _id: req.body._id
            }
            noteService.deletePermanent(noteid).then((data) => {
                response.status = true;
                response.message = "Note deleted permanently...!";
                response.data = data;
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server error...!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to delete all notes from trash in one go
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    emptyTrash(req, res) {
        let response = {}
        try {
            noteService.trashEmpty(req).then((data) => {
                response.status = true;
                response.message = "All notes from trash are deleted...!";
                response.data = data;
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server error...!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to restore specific note from trash
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    restoreNotes(req, res) {
        let response = {}
        try {
            noteService.noteRestore(req.body._id).then((data) => {
                response.status = true;
                response.message = "restored respected note...!";
                response.data = data;
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server error...!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to update specific label to requested note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    updateLabelToNote(req, res) {
        let response = {}
        try {
            let updateLabel = {
                _id: req.body._id,
                userID: req.decoded._id,
                labelName: req.body.labelName,
                labelID: req.body.labelID
            }
            noteService.addLabelToNote(updateLabel).then((data) => {
                // console.log("data in notecontroller", data);

                response.status = true;
                response.message = "label added to note";
                response.data = data
                res.status(200).send(response)
            }).catch((err) => {
                // console.log("error in notecontroller", err);

                response.status = false;
                response.message = "Server Error..!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            // console.log("error in catch ", err);

            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }
 
    /**
     * @description: function to delete specific label from note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    deleteLabelFromNote(req, res) {
        let response = {};
        try {
            let deleteLabel = {
                _id: req.body._id,
                labelID: req.body.labelID
            }
            noteService.removeLabelFromNote(deleteLabel).then((data) => {
                response.status = true;
                response.message = "label deleted from note";
                response.data = data
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server Error..!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to respond back requested list from user
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    requestedList(req, res) {
        let response = {}
        try {
            let redis = Object.keys(req.query)[0]
            let user
            (Object.keys(req.query)[0] === "isArchive") ? user = { "userID": req.decoded._id, "isArchive": true }
                : (Object.keys(req.query)[0] === "isTrashed") ? user = { "userID": req.decoded._id, "isTrashed": true }
                    : (Object.keys(req.query)[0] === "Reminder") ? user = { "userID": req.decoded._id, "Reminder": true }
                        : new Error("Undefined request")
            if (user !== undefined) {
                noteService.getList(user, redis).then((data) => {
                    response.status = true;
                    response.message = "requested list";
                    response.data = data
                    res.status(200).send(response)
                }).catch((err) => {
                    response.status = false;
                    response.message = "Unable to get requested list";
                    response.error = err
                    res.status(500).send(response)
                })
            } else {
                throw "No params passed to search list of..!"
            }

        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

    /**
     * @description: function to set reminder to the existing note
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    setReminder(req, res) {
        let response = {}
        try {
            let reminder = {
                _id: req.body._id,
                Reminder: req.body.Reminder
            }
            noteService.reminder(reminder).then((data) => {
                response.status = true;
                response.message = "Reminder set to true";
                response.data = data
                res.status(200).send(response)
            }).catch((err) => {
                response.status = false;
                response.message = "Server Error..!";
                response.error = err
                res.status(500).send(response)
            })
        } catch (err) {
            response.status = false;
            response.message = "Server Error..!";
            response.error = err
            res.status(500).send(response)
        }
    }

    /**
     * @description: function to search specific note from all notes of user
     * @param {*client request body} req 
     * @param {*To show client his data and status code} res 
     */
    searchNote(req, res) {
        let response = {}
        try {
            noteService.noteSearch(req).then(data => {
                response.status = true;
                response.message = "Searched note..!";
                response.data = data
                res.status(200).send(response)
            }).catch(error => {
                response.status = false;
                response.message = "Server Error..!";
                response.error = error
            })
        } catch (err) {
            response.status = false;
            response.message = "Server Error..!";
            response.error = err;
            res.status(500).send(response)

        }
    }
}

module.exports = new ControllerNote();