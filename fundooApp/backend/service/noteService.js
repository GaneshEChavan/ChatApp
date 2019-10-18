const noteModel = require("../model/noteModel")
const labelModel = require("../model/labelModel")

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
                let search = { "_id": noteId._id }
                let update = { "isTrashed": noteId.isTrashed }
                noteModel.updateNote(search, update).then((data) => {
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
                console.log(" body in service ", body);

                let noteid = { "_id": body._id }
                noteModel.readNotes(noteid).then((data) => {
                    console.log(" data in service ", data[0].isArchive);

                    let noteChanges = {
                        "title": body.title ? body.title : data[0].title,
                        "description": body.description ? body.description : data[0].description,
                        "color": body.color ? body.color : data[0].color,
                        "isArchive": (body.isArchive !== data[0].isArchive) ? body.isArchive : data[0].isArchive
                    }
                    console.log("data object in service", noteChanges);

                    noteModel.updateNote(noteid, noteChanges).then((Data) => {
                        res(Data)
                        console.log(" data after update successfully in service", Data);

                    }).catch((err) => {
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

    deletePermanent(noteid) {
        try {
            return new Promise((res, rej) => {
                let note = { "_id": noteid._id }
                noteModel.permanentDelete(note).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }

    }

    trashEmpty() {
        try {
            return new Promise((res, rej) => {
                let trash = { "isTrashed": true }
                noteModel.deletetrash(trash).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    noteRestore(noteId) {
        try {
            return new Promise((res, rej) => {
                let noteid = { "_id": noteId }
                let restore = { "isTrashed": false }
                noteModel.updateNote(noteid, restore).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    addLabelToNote(updateLabel) {
        try {
            return new Promise((res, rej) => {
                // console.log("req body in noteservice",updateLabel)
                if (updateLabel.labelID === undefined) {
                    let label = {
                        userID: updateLabel.userID,
                        noteID: updateLabel._id,
                        labelName: updateLabel.labelName,
                        isDeleted: false
                    }
                    // console.log("labelId not provided in noteservice",label);

                    labelModel.createLabel(label).then((data) => {
                        // console.log("data after creatin label in noteservice",data);
                        let noteid = { "_id": updateLabel._id };
                        let query = { $addToSet: { "label": data } }
                        noteModel.updateNote(noteid, query).then((data) => {
                            res(data)
                        }).catch((err) => {
                            rej(err)
                        })
                    })
                } else {                  
                  let labelExist = {
                        "_id": updateLabel.labelID
                    }
                    // console.log("label id in noteservice",labelExist);
                    
                    labelModel.readLabel(labelExist).then((data) => {
                        // console.log("label id present in noteservice", data)
                        let noteid = { "_id": updateLabel._id };
                        let query = { $addToSet: { "label": data[0] } }
                        noteModel.updateNote(noteid, query).then((data) => {
                            res(data)
                        }).catch((err) => {
                            rej(err)
                        })
                    }).catch((err) => {
                        rej(err)
                    })
                }
            })

        } catch (err) {
            return err
        }
    }

    removeLabelFromNote(deleteLabel){
        try{
        return new Promise((res,rej)=>{
          let noteId = {"_id":deleteLabel._id};
          let query = { $pull : {label: {_id: deleteLabel.labelID}}}
          noteModel.updateNote(noteId,query).then((data)=>{
              res(data)
          }).catch((err)=>{
              rej(err)
          })
        })
        }catch(err){
            return err
        }
    }
}

module.exports = new ServiceNote();