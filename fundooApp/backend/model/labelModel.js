

const mongoose = require("mongoose");

let Schema = mongoose.Schema(
    {
        userID: {
            type: String
        },
        noteID: {
            type: String
        },
        labelName: {
            type: String
        },
        isDeleted: {
            type: Boolean
        }
    },
    { timestamps: true }
)

let Label = mongoose.model("Labels", Schema)

class ModelLabel {
    createLabel(label) {
        try {
            return new Promise((res, rej) => {
                let newLabel = new Label({
                    "userID": label.userID,
                    "noteID": label.noteID,
                    "labelName": label.labelName,
                    "isDeleted": label.isDeleted
                })
                newLabel.save((err, data) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(data)
                    }
                })
            })
        } catch (err) {
            return err
        }
    }

    readLabel(userId) {
        try {
            return new Promise((res, rej) => {
                Label.find(userId).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    deleteLabel(labelId) {
        try {
            return new Promise((res, rej) => {
                Label.findByIdAndDelete(labelId).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    updateLabel(labelId,update) {
        try {
            return new Promise((res, rej) => {
                Label.findByIdAndUpdate(labelId,update,{new:true}).then((data) => {
                    console.log("data in model after update--->80",data);
                    
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
