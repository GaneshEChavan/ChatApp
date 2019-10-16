const noteModel = require("../model/noteModel")

class ModelNote {
    newNote(noteData) {
        try {
            return new Promise((res, rej) => {
                noteModel.createNote(noteData).then((data) => {
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

module.exports = new ModelNote();