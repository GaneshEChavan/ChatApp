/******************************************************************************
 *  @Purpose        : To create a label schema and store data into database.
 *  @file           : model/labelModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

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
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean
        }
    },
    { timestamps: true },
    { strict: true }
);

let Labels = mongoose.model("Labels", Schema);

class ModelLabel {
    createLabel(label) {
        try {
            let newLabel = new Labels({
                "userID": label.userID,
                "noteID": label.noteID,
                "labelName": label.labelName,
                "isDeleted": label.isDeleted
            });
            return newLabel.save();
        } catch (err) {
            return err;
        }
    }

    readLabel(userId) {
        try {
            return Labels.find(userId);
        } catch (err) {
            return err;
        }
    }

    deleteLabel(labelId) {
        try {
            return Labels.findByIdAndDelete(labelId);
        } catch (err) {
            return err;
        }
    }

    updateLabel(labelId, update) {
        try {
            return Labels.findByIdAndUpdate(labelId, update, { new: true });
        } catch (err) {
            return err;
        }
    }
}

module.exports = new ModelLabel();
