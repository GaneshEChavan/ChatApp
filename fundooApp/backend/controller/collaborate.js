const collaborateService = require("../service/collaborate").default;

class ControlCollaborate{
    addCollaborator (req,res){
        let response = {};
        let colaborator = {
            userID : req.decoded._id,
            collaboratorID : req.body.collaboratorID,
            noteID : req.body.noteID
        };
        collaborateService.colabAdd(colaborator).then( data => {
            response.status = true;
            response.message = "collaborator added ..!";
            response.data = data;
            res.status(201).send(response);
        }).catch( err => {
            response.status = false;
            response.message = "Something went wrong..!";
            response.error = err;
            res.status(500).send(response);
        });
    }

    readCollaborator(req,res){
        let response = {};
        let colab = {
            userID : req.decoded._id,
            collaboratorID : req.body.collaboratorID
        };
        collaborateService.colabRead(colab).then(data=>{
            response.status = true;
            response.message = "collaborator user common notes ..!";
            response.data = data;
            res.status(201).send(response);
        }).catch(err=>{
            response.status = false;
            response.message = "Something went wrong..!";
            response.error = err;
            res.status(500).send(response);
        });
    }
}

module.exports = new ControlCollaborate();