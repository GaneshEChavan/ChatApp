const noteService = require("../service/noteService")

class ControllerNote {
    createNote(req, res) {
        let response = {};
        // console.log(req.body);
        // console.log(req.decoded);
        try {
            // req.checkBody("",)
            let noteData = {
                userID: req.decoded._id,
                title: req.body.title,
                description: req.body.description,
                color: req.body.color
            }
            noteService.newNote(noteData).then((data) => {
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
               console.log("data in notecontroller",data);
               
                response.status = true;
                response.message = "label added to note";
                response.data = data
                res.status(200).send(response)
            }).catch((err) => {
                console.log("error in notecontroller",err);
                
                response.status = false;
                response.message = "Server Error..!";
                response.error = err;
                res.status(500).send(response)
            })
        } catch (err) {
            console.log("error in catch ",err);
            
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

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

    requestedList(req, res) {
        let response = {}
        try {
            let user = {
                "userID": req.decoded._id
            }
            console.log(Object.keys(req.body).length)
            let list
            (req.body.isArchive !== undefined) ? list = { "isArchive": req.body.isArchive }
                : (req.body.isTrashed !== undefined) ? list = { "isTrashed": req.body.isTrashed }
                    : (req.body.Reminder !== undefined) ? list = { "Reminder": req.body.Reminder }
                        : new Error("Undefined request")
            console.log("list of request in noteController-->242", list);
            if (list !== undefined && Object.keys(req.body).length === 1) {
                noteService.getList(user, list).then((data) => {
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
                throw "undefined request"
            }
        } catch (err) {
            response.status = false;
            response.message = "Something Went Wrong..!";
            response.error = err;
            res.status(400).send(response)
        }
    }

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

    searchNote(req, res) {
        let response = {}
        try {
           noteService.noteSearch(req).then(data=>{
               response.status = true;
               response.message = "Searched note..!";
               response.data = data
               res.status(200).send(response)
           }).catch(error=>{
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