/***********************************************************************************************************
 *  @Purpose        : To create label services that will perform logical operations on request body and 
 *                    send the incoming data to label Model  
 *  @file           : service/label.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 15-10-2019
 ************************************************************************************************************/

const labelModel = require("../model/label");
const noteService = require("./note");

class ModelLabel {
    newLabel(label) {
        try {
            return new Promise((res, rej) => {
                labelModel.createLabel(label).then((data) => {
                    res(data);
                }).catch((err) => {
                    rej(err);
                });
            });
        } catch (err) {
            return err;
        }
    }

    labelRead(userid) {
        try {
            return new Promise((res, rej) => {
                let userId = { "userID": userid.userID };
                labelModel.readLabel(userId).then((data) => {
                    res(data);
                }).catch((err) => {
                    rej(err);
                });
            });
        } catch (err) {
            return err;
        }
    }

    labelDelete(labelid) {
        try {
            return new Promise((res, rej) => {
                let labelId = { "_id": labelid._id };
                labelModel.deleteLabel(labelId).then((data) => {
                    let deleteLabel = {
                        all: {},
                        labelID: labelid._id
                    };
                    console.log("deleteLabel in labelservice", deleteLabel);

                    noteService.removeLabelFromNote(deleteLabel);
                    res(data);
                }).catch((err) => {
                    rej(err);
                });
            });
        } catch (err) {
            return err;
        }
    }

    labelUpdate(labelid) {
        console.log("----->66 labelservice",labelid)
        try {
            return new Promise((res, rej) => {
                let labelId = { "_id": labelid._id };
                let update = { "labelName": labelid.labelName };
                labelModel.updateLabel(labelId, update).then((data) => {
                    console.log("data in service after update-->54", data);
                    res(data);
                }).catch((err) => {
                    console.log("---->labelService75",err);
                    
                    rej(err);
                });
            });
        } catch (err) {
            console.log("---->81",err);
            
            return err;
        }
    }
}

module.exports = new ModelLabel();