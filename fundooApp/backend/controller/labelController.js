const labelService = require("../service/labelService")

class ControllerLabel {
    createLabel(req, res) {
        let responce = {}
        try {
            let label = {
                userID: req.decoded._id,
                labelName: req.body.labelName
            }
            labelService.newLabel(label).then((data) => {
                responce.status = true;
                responce.message = "label Created..!";
                responce.data = data
                res.status(201).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "Server Error..!";
                responce.error = err;
                res.status(500).send(responce)
            })
        } catch (err) {
            responce.status = false;
            responce.message = "Something Went Wrong...!";
            responce.error = err
            res.status(400).send(responce)
        }
    }

    readLabel(req,res){
        let responce = {};
        try{
           let userid = {
               userID : req.decoded._id
           }
           labelService.labelRead(userid).then((data)=>{
               responce.status = true;
               responce.message = "all labels of user..!";
               responce.data = data;
               res.status(200).send(responce)
           }).catch((err)=>{
               responce.status = false;
               responce.message = "Server Error..!";
               responce.error = err;
               res.status(500).send(responce)
           })
        }catch(err){
            responce.status = false;
            responce.message = "Something Went Wrong...!";
            responce.error = err
            res.status(400).send(responce)
        }
    }
}

module.exports = new ControllerLabel();