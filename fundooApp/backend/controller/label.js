/*****************************************************************************************
 *  @Purpose        : To create label controller to handle the incoming data. 
 *  @file           : controller/label.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 15-10-2019
 *****************************************************************************************/

const labelService = require("../service/label")
const logger = require("../../logger/logger")
class ControllerLabel {
    createLabel(req, res) {
        let responce = {}
        try {
            let label = {
                userID: req.decoded._id,
                noteID: req.body.noteID,
                labelName: req.body.labelName
            }
            labelService.newLabel(label).then((data) => {
                responce.status = true;
                responce.message = "label Created..!";
                responce.data = data
                res.status(201).send(responce)
            }).catch((err) => {
                logger.error(err)
                responce.status = false;
                responce.message = "Server Error..!";
                res.status(500).send(responce)
            })
        } catch (err) {
            logger.error(err)
            responce.status = false;
            responce.message = "Something Went Wrong...!";
            res.status(400).send(responce)
        }
    }

    readLabel(req, res) {
        let responce = {};
        try {
            let userid = {
                userID: req.decoded._id
            }
            labelService.labelRead(userid).then((data) => {
                responce.status = true;
                responce.message = "all labels of user..!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                logger.error(err)
                responce.status = false;
                responce.message = "Server Error..!";
                res.status(500).send(responce)
            })
        } catch (err) {
            logger.error(err)
            responce.status = false;
            responce.message = "Something Went Wrong...!";
            res.status(400).send(responce)
        }
    }

    deleteLabel(req, res) {
        console.log(req.query);
        
        let responce = {};
        try {
            let labelid = {
                _id: req.body._id
            }
            labelService.labelDelete(labelid).then((data) => {
                responce.status = true;
                responce.message = "deleted requested label..!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                logger.error(err)
                responce.status = false;
                responce.message = "Server Error..!";
                res.status(500).send(responce)
            })
        } catch (err) {
            logger.error(err)
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            res.status(400).send(responce)
        }
    }

    updateLabel(req, res) {
        let responce = {};
        try {
            let labelid = {
                _id: req.body._id,
                labelName: req.body.labelName
            }
            labelService.labelUpdate(labelid).then((data) => {
                // console.log("data in controller after update", data);

                responce.status = true;
                responce.message = "label updated seccessfully..!";
                responce.data = data;
                res.status(200).send(responce)
            }).catch((err) => {
                logger.error(err)
                responce.status = false;
                responce.message = "Server Error..!";
                res.status(500).send(responce)
            })
        } catch (err) {
            logger.error(err)
            responce.status = false;
            responce.message = "Something Went Wrong..!";
            res.status(400).send(responce)
        }
    }
}

module.exports = new ControllerLabel();