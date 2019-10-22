const labelModel = require("../model/labelModel");
const noteService = require("../service/noteService")

class ModelLabel {
    newLabel(label) {
        try {
            return new Promise((res, rej) => {
                labelModel.createLabel(label).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    labelRead(userid) {
        try {
            return new Promise((res, rej) => {
                let userId = { "userID": userid.userID }
                labelModel.readLabel(userId).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    labelDelete(labelid) {
        try {
            return new Promise((res, rej) => {
                let labelId = { "_id": labelid._id }
                labelModel.deleteLabel(labelId).then((data) => {
                    let deleteLabel = {
                        all : {},
                        labelID: labelid._id
                    }
                    console.log("deleteLabel in labelservice",deleteLabel);
                    
                    noteService.removeLabelFromNote(deleteLabel)
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    labelUpdate(labelid) {
        try {
            return new Promise((res, rej) => {
                let labelId = { "_id": labelid._id }
                let update = { "labelName": labelid.labelName }
                labelModel.updateLabel(labelId, update).then((data) => {
                    console.log("data in service after update-->54", data);
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }
}

module.exports = new ModelLabel()