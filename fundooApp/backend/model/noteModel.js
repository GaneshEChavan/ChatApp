/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : model/noteModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");
/**
 * @description:Creating note schema using mongoose
 **/
var Schema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required : true
        },
        description: {
            type: String,
        },
        color: {
            type: String
        },
        isArchive: {
            type: Boolean,
            default: false
        },
        isPinned: {
            type: Boolean,
            default: false
        },
        isTrashed: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: null
        },
        Reminder: {
            type: Boolean,
            default: false
        },
        collaborators: [{
            type: String,
            default: null
        }],
        label: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Labels'
        }]
    },
    { timestamps: true }
)

let Notes = mongoose.model("Notes", Schema)


class ModelNote {
    createNote(noteData) {
        try {
            return new Promise((res, rej) => {
                let note = new Notes({
                    "userID": noteData.userID,
                    "title": noteData.title,
                    "description": noteData.description,
                    "color": noteData.color,
                    "isArchive": noteData.isArchive,
                    "isPinned": noteData.isPinned,
                    "isTrashed": noteData.isTrashed,
                    "image": noteData.image,
                    "Reminder": noteData.Reminder,
                    // "collaborators":noteData.collaborators,
                    "label": noteData.label
                })

                note.save((err, data) => {
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

    readNotes(query) {
        try {
            return new Promise((res, rej) => {
                // console.log("query in noteModel", query);

                Notes.find(query).populate('label').then((data) => {
                    console.log("data after find in model", data);

                    res(data)
                }).catch((err) => {
                    console.log("error after ", err);

                    rej(err)
                })
            })
        } catch (err) {
            return err
        }

    }

    updateNote(query, update) {
        try {
            return new Promise((res, rej) => {
                Notes.updateMany(query, update, { new: true }).populate('label').then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    updateSingleNote(query, update) {
        try {
            return new Promise((res, rej) => {
                Notes.findOneAndUpdate(query, update, { new: true }).populate('label').then((data) => {
                   console.log("--------------------data",data);
                   
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    permanentDelete(note) {
        try {
            return new Promise((res, rej) => {
                Notes.findByIdAndDelete(note).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    deletetrash(trash) {
        try {
            return new Promise((res, rej) => {
                Notes.deleteMany(trash).then((data) => {
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

module.exports = new ModelNote()