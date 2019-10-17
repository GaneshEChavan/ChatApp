const noteModel = require("../model/noteModel")

class ServiceNote {
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

    userNotes(user) {
        try {
            return new Promise((res, rej) => {
                let userinfo = { "userID": user.userID }
                noteModel.readNotes(userinfo).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    addToTrash(noteId) {
        try {
            return new Promise((res, rej) => {
                let update = { "isTrashed": noteId.isTrashed }
                noteModel.updateNote(noteId._id, update).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    noteChanges(body) {
        try {
            return new Promise((res, rej) => {
                console.log(" body in service ",body);
                
                let noteid = { "_id": body._id }
                noteModel.readNotes(noteid).then((data) => {
                    console.log(" data in service ",data[0].isArchive);
                    
                    let noteChanges = {
                        "title": body.title ? body.title : data[0].title,
                        "description": body.description ? body.description : data[0].description,
                        "color": body.color ? body.color : data[0].color,
                        "isArchive": (body.isArchive !== data[0].isArchive)  ? body.isArchive : data[0].isArchive
                    }
                    console.log("data object in service",noteChanges);
                    
                    noteModel.updateNote(noteid,noteChanges).then((Data)=>{
                        res(Data)
                        console.log(" data after update successfully in service",Data);
                        
                    }).catch((err)=>{
                        rej(err)
                    })
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }
}

module.exports = new ServiceNote();