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
        label: {
            type: Object
        }
    },
    { timestamps: true }
)

let Note = mongoose.model("Notes", Schema)

class ModelNote {
    createNote(noteData) {
        try {
            return new Promise((res, rej) => {
                let note = new Note({
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
                Note.find(user).then((data) => {
                    console.log("noteModel--->81", data);
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }

    }

    updateNote(noteId, update) {
        try {
            return new Promise((res, rej) => {
                console.log("notemodel--->96", update);
                Note.findOneAndUpdate(noteId, update, { new: true }).then((data) => {
                    console.log("model--->97", data);
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
                Note.findByIdAndDelete(note).then((data) => {
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
                Note.deleteMany(trash).then((data) => {
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