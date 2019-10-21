const mongoose = require("mongoose");

var Schema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        title: {
            type: String,
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
        label: [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Labels'
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

    readNotes(user) {
        try {
            return new Promise((res, rej) => {
                Notes.find(user).populate('label').then((data) => {
                    res(data)
                }).catch((err) => {
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
                Notes.findOneAndUpdate(query, update, { new: true }).populate('label').then((data) => {
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