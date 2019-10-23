const noteModel = require("../model/noteModel")
const labelModel = require("../model/labelModel")

var redis = require("redis");
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

class ServiceNote {
    newNote(noteData) {
        try {
            return new Promise((res, rej) => {
                noteModel.createNote(noteData).then((Data) => {
                    console.log("----->16",Data);
                    // let buff = new Buffer.from(JSON.stringify(data)) 
                    // console.log("----->noteservice-->18",buff);
                                       
                    client.del(Data.userID + 'notes')
                    let user = {
                        userID : Data.userID
                    }
                    this.userNotes(user)
                    res(Data)
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
                    // console.log("----->24",data);
                    // client.SET('notes',JSON.stringify(data))
                    // let buff = new Buffer.from(JSON.stringify(data))
                    // console.log("buffer data saved in noteservice",data)
                    client.SET(data[0].userID + 'notes', JSON.stringify(data))
                    res(data)
                }).catch((err) => {
                    // console.log(err);
                    
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

    trashEmpty(req) {
        try {
            return new Promise((res, rej) => {
                let trash = { "userID": req.decoded._id, "isTrashed": true }
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
                        console.log("data in noteservice after read",data);
                        
                    let noteid = { "_id": updateLabel._id };
                    let query = { $addToSet: { "label": data[0] } }
                    noteModel.updateNote(noteid, query).then((data) => {
                        console.log("after update in noteservice",data);
                        
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
                let noteId
                (deleteLabel.all) ? noteId = deleteLabel.all : noteId = { "_id": deleteLabel._id };
                let query = { $pull: { "label": deleteLabel.labelID } }
                            noteModel.updateNote(noteId, query).then((data) => {
                                console.log("laebl found and updated", data);
                                res(data)
                            }).catch((err) => { rej(err) })
            })
        } catch (err) {
            return err
        }
    }

    getList(user) {
        try {
            return new Promise((res, rej) => {
                        noteModel.readNotes(user).then((data) => {
                            console.log("data in noteservice-->223", data);
                            res(data)
                        }).catch((err) => {
                            rej(err)
                        })
            })
        } catch (err) {
            return err
        }
    }

    reminder(reminder) {
        try {
            return new Promise((res, rej) => {
                let note = { "_id": reminder._id }
                let upload = { "Reminder": reminder.Reminder }
                noteModel.updateNote(note, upload).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    noteSearch(req) {
        try {
            return new Promise((res, rej) => {
                let data = req.body.search;
                let userID = req.decoded._id

                let findQuery = {
                    $and: [{
                        $or: // the $or carries out the optional functionality
                            [   //options i Case insensitivity to match upper and lower cases. 
                                { 'title': { $regex: data, $options: 'i' } },
                                { 'description': { $regex: data, $options: 'i' } },
                                // {'label':{$in:{$regex:data}}},
                                // { 'Reminder': { $regex: data, $options: 'i' } },
                                { 'color': { $regex: data, $options: 'i' } }
                            ]
                    }, { 'userID': userID }]
                }
                console.log("find query in noteservice",findQuery);
                
                noteModel.readNotes(findQuery).then(data => {
                   console.log("data after find in note service",data);
                    res(data)
                }).catch(err => {
                    rej(err)
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