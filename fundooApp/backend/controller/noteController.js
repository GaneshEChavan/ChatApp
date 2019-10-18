const noteService = require("../service/noteService")

class ControllerNote {
    createNote(req, res) {
        let responce = {};
        // console.log(req.body);
        // console.log(req.decoded);
        try {
            let noteData = {
                userID: req.decoded._id,
                title: req.body.title,
                description: req.body.description,
                color: req.body.color
            }
            noteService.newNote(noteData).then((data) => {
                responce.status = true;
                responce.message = "Note Created successfully..!";
                responce.data = data;
                res.status(201).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Unable to create note..!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something went wrong";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    readNote(req, res) {
        let responce = {}
        try {
            let user = {
                userID: req.decoded._id
            }
            noteService.userNotes(user).then((data) => {
                responce.status = true;
                responce.message = "showing all notes of user...!";
                responce.data = data;
                res.status(202).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server Error";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    deleteNote(req, res) {
        let responce = {}
        try {
            let noteId = {
                userID: req.decoded._id,
                _id: req.body._id,
                isTrashed: req.body.isTrashed
            }
            noteService.addToTrash(noteId).then((data) => {
                responce.status = true;
                responce.message = "Note deleted and added to trash...!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "unable to delete note...!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    updateNote(req, res) {
        let responce = {}
        try {
            noteService.noteChanges(req.body).then((data) => {
                responce.status = true;
                responce.message = "changes made to notes...!";
                responce.data = data;
                res.status(202).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server error...!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    permanentDeleteNote(req, res) {
        let responce = {}
        try {
            let noteid = {
                _id: req.body._id
            }
            noteService.deletePermanent(noteid).then((data) => {
                responce.status = true;
                responce.message = "Note deleted permanently...!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server error...!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    emptyTrash(req, res) {
        let responce = {}
        try {
            noteService.trashEmpty().then((data) => {
                responce.status = true;
                responce.message = "All notes from trash are deleted...!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server error...!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    restoreNotes(req, res) {
        let responce = {}
        try {
            noteService.noteRestore(req.body._id).then((data) => {
                responce.status = true;
                responce.message = "restored respected note...!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server error...!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    updateLabelToNote(req, res) {
        let responce = {}
        try {
            let updateLabel = {
                _id: req.body._id,
                userID: req.decoded._id,
                labelName: req.body.labelName,
                labelID: req.body.labelID
            }
            console.log("request label in notecontroller", updateLabel);

            noteService.addLabelToNote(updateLabel).then((data) => {
                responce.status = true;
                responce.message = "label added to note";
                responce.data = data
                res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server Error..!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            responce.error = err;
            res.status(400).send(responce)
        }
    }

    deleteLabelFromNote(req, res) {
        let responce = {};
        try {
            let deleteLabel = {
                _id: req.body._id,
                labelID: req.body.labelID
            }
            noteService.removeLabelFromNote(deleteLabel).then((data)=>{
                responce.status = true;
                responce.message = "label deleted from note";
                responce.data = data
                res.status(200).send(responce)
            }).catch((err)=>{
                responce.status = false;
                responce.message = "Server Error..!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {

        }
    }
}

module.exports = new ControllerNote();