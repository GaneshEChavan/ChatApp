const noteService = require("../service/noteService")

class ServiceNote {
    createNote(req, res) {
        let responce = {};
        console.log(req.body);
        
        try {
            let noteData = {
                userID: req.body.userID,
                title: req.body.title,
                description: req.body.description,
                color: req.body.color
            }
            noteService.newNote(noteData).then((data) => {
                responce.status = true;
                responce.message = "Note Created successfully..!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err)=>{
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
}

module.exports = new ServiceNote();