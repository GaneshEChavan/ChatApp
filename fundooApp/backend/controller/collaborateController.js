const collaborateService = require("../service/collaborateService");

class ControlCollaborate{
    addCollaborator (req,res){
        let response = {};
        let colaborator = {
            userID : req.decoded._id,
            collaboratorID : req.body.collaboratorID,
            noteID : req.body.noteID
        }
        collaborateService.colabAdd(colaborator).then( data => {
           response.status = true;
           response.message = "collaborator added ..!";
           response.data = data
           res.status(201).send(response)
        }).catch( err => {
           response.status = false;
           response.message = "Something went wrong..!";
           response.error = err;
           res.status(500).send(response)
        })
    }
}

module.exports = new ControlCollaborate();