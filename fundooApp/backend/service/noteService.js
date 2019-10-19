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
                if (updateLabel.labelID === undefined) {
                    let label = {
                        userID: updateLabel.userID,
                        noteID: updateLabel._id,
                        labelName: updateLabel.labelName,
                        isDeleted: false
                    }

                    labelModel.createLabel(label).then((data) => {
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
                    labelModel.readLabel(labelExist).then((data) => {
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

    removeLabelFromNote(deleteLabel) {
        try {
            return new Promise((res, rej) => {
                let noteId = { "_id": deleteLabel._id };
                //   let label = {"label":{$elemMatch:{"_id":deleteLabel.labelID}}};
                let query = { $pull: { "label": deleteLabel.labelID } }
                noteModel.readNotes(noteId).then((data) => {
                    console.log("--->180", data[0].label)
                    let check = false
                    data[0].label.forEach(Data => {
                        console.log("checking for label inside foreach");
                        // console.log("--->182", Data._id);
                        // console.log("--->183", deleteLabel.labelID)
                          console.log(Data._id == deleteLabel.labelID);
                         if (Data._id == deleteLabel.labelID) {
                            console.log("true")
                            noteModel.updateNote(noteId, query).then((data) => {
                                console.log("laebl found and updated", data);
                                check = true;
                                res(data)
                            }).catch((err) => { rej(err) })
                        }
                        // else if(check === true){
                        //        res("changed")
                        // }                        
                    })
                    if(check === true){
                        console.log("checking for label inside check true");
                        res("User is not present")
                    }
                }).catch((err) => {
                    rej("to check if err in noteservice", err);
                })
            })
        } catch (err) {
            return err
        }
    }
}

module.exports = new ServiceNote();

// let findingQuery = {
//     $and: [{
//         $or: // the $or carries out the optional functionality
//             [   //options i Case insensitivity to match upper and lower cases. 
//                 { 'title': { $regex: enteredData, $options: 'i' } },
//                 { 'description': { $regex: enteredData, $options: 'i' } },
//                 { 'reminder': { $regex: enteredData, $options: 'i' } },
//                 { 'color': { $regex: enteredData, $options: 'i' } }
//             ]
//     }, { 'userId': searchingData.userId }]
// }