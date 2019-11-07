/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                      to noteModel and save that data to database and at login 
                      time fetching correct information from database.
 *  @file           : note.services.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/
const noteModel = require("../model/note")
const labelModel = require("../model/label")
const userModel = require("../model/user")
const logger = require("../../logger/logger")

/**
 * @description: imported redis to use redis-cache in service file, used to set key-values
 */
var redis = require("redis");
var client = redis.createClient();

client.on('error', function (err) {
    logger.error('Something went wrong ', err) //<----------
});

/**
 * @description: service class to wrap all service functions for notes
 */
class ServiceNote {
    /**
     * @description: function to create new note 
     * @param {*contains notes info to be created} noteData 
     * @param {*contains requested collaborators} colab 
     */
    newNote(noteData, colab) {
        try {
            return new Promise((res, rej) => {
                if (colab.collaborators != undefined) {
                    if (colab.collaborators.length > 0) {
                        /**
                        * @description: creates array of unique values of collaborator ID's
                        * @param {*contains array of collaborator ID's} colab.collaborators 
                        */
                        let unique = Array.from(new Set(colab.collaborators))
                        noteModel.createNote(noteData).then((Data) => {
                            /**
                             * @description: check for each id should exists or not if yes then add to colaborator else continue 
                             */
                            unique.forEach(id => {
                                let search = { "_id": id };
                                userModel.read(search).then(data => {
                                    let search = { "_id": Data._id };
                                    let update = { $addToSet: { "collaborators": id } }
                                    noteModel.updateSingleNote(search, update).then(data => {
                                        let user = {
                                            userID: data.userID
                                        }
                                        /**
                                        * @description: called function from same file to save changes made, in redis 
                                        */
                                        this.userNotes(user)
                                        res("Collaborator Added..!")
                                    }).catch(err => {
                                        rej(err)
                                    })
                                }).catch(err => {
                                    logger.info(err); //<-------
                                })
                            })
                        }).catch((err) => {
                            rej(err)
                        })
                    }
                } else {
                    noteModel.createNote(noteData).then(data => {
                        res(data)
                    }).catch(err => {
                        rej(err)
                    })
                }
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: 
     * @param {*contains changes to be updated in note} body 
     */
    noteChanges(body) {
        try {
            return new Promise((res, rej) => {
                let noteid = { "_id": body._id }
                noteModel.readNotes(noteid).then((data) => {

                    /**
                    * @description: used turnary operator to make new object with requested changes
                    */
                    let noteChanges = {
                        "title": body.title ? body.title : data[0].title,
                        "description": body.description ? body.description : data[0].description,
                        "color": body.color ? body.color : data[0].color,
                        // "collaborators":body.collaborators ? { $addToSet: { "collaborators": id } } : data[0].collaborators,
                        "isArchive": (body.isArchive == true) ? true : false,
                        "isPinned": (body.isPinned == true) ? true : false,
                        "Reminder": (body.Reminder == true) ? true : false
                    }

                    noteModel.updateSingleNote(noteid, noteChanges).then((Data) => {
                        if (body.collaborators) {
                            if (body.collaborators.length > 0) {
                                /**
                                * @description: creates array of unique values of collaborator ID's 
                                */
                                let unique = Array.from(new Set(body.collaborators))
                                unique.forEach(id => {
                                    let search = { "_id": id }
                                    userModel.read(search).then(DAta => {
                                        let Search = { "_id": data[0]._id };
                                        let update = { $addToSet: { "collaborators": id } }
                                        noteModel.updateSingleNote(Search, update).then(data => {
                                            /**
                                            * @description: called function from same file to save changes made, in redis 
                                            */
                                            let User = { "userID": Data.userID, "isArchive": true }
                                            let redis = "isArchive"
                                            this.getList(User, redis)
                                            let user = { "userID": Data.userID, "Reminder": true }
                                            let Redis = "Reminder"
                                            this.getList(user, Redis)
                                            res("Notes updated..!")
                                        }).catch(err => {
                                            rej(err)
                                        })
                                    }).catch(err => {
                                        logger.info("error of update api in noteservice", err)//<---------
                                    })
                                })
                            }
                        } else {
                            res(Data)
                        }

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

    /**
     * @description: function to request all notes 
     * @param {*contains userID} user 
     */
    userNotes(user) {
        try {
            return new Promise((res, rej) => {
                let userinfo = { "userID": user.userID }
                noteModel.readNotes(userinfo).then((data) => {
                    let buff = new Buffer.from(JSON.stringify(data))
                    client.SET(data[0].userID + 'notes', buff)
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to pass user request to update changes 
     * @param {*contains delete request} noteId 
     */
    addToTrash(noteId) {
        try {
            return new Promise((res, rej) => {
                let search = { "_id": noteId._id }
                let update = { "isTrashed": noteId.isTrashed }
                noteModel.updateSingleNote(search, update).then((data) => {
                    // client.DEL(data.userID + 'notes')
                    let user = {
                        userID: data.userID
                    }
                    /**
                     * @description: called function from same file to update redis-cache too
                     */
                    this.userNotes(user)
                    let User = { "userID": data.userID, "isTrashed": true }
                    let redis = "isTrashed"
                    this.getList(User, redis)
                    res(data)

                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to request model file for reuired list 
     * @param {*contains noteID} user 
     * @param {*contains redis key} redis 
     */
    getList(user, redis) {
        try {
            return new Promise((res, rej) => {
                noteModel.readNotes(user).then((data) => {
                    /**
                     * @description: User buffer format to SET data in cache in consideration of big data
                     */
                    let buff = new Buffer.from(JSON.stringify(data))
                    client.SET(data[0].userID + redis + 'true', buff)
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to remove collaborator from note
     * @param {*contains array of collaborators ID} body 
     */
    colaboratorRemove(body) {
        try {
            return new Promise((res, rej) => {
                let Search = { "_id": body._id }
                noteModel.readNotes(Search).then(DATA => {
                    /**
                    * @description: creates array of unique values of collaborator ID's 
                    */
                    let unique = Array.from(new Set(body.collaborators))
                    unique.forEach(id => {
                        let search = { "_id": id };
                        userModel.read(search).then(Data => {
                            /**
                             * @description: $pull is mongoDB array operator to remove specified value 
                             */
                            let query = { "_id": DATA[0]._id };
                            let update = { $pull: { "collaborators": id } }
                            noteModel.updateSingleNote(query, update).then(DAta => {
                                // console.log("data after update in noteservice", DAta);
                                /** 
                                * @description: called function from same file to update redis-cache too
                                */
                                let user = {
                                    userID: DAta.userID
                                }
                                this.userNotes(user)
                                let User = { "userID": DAta.userID, "isTrashed": true }
                                let redis = "isTrashed"
                                this.getList(User, redis)
                                res("collaborators removed..!")
                            }).catch(err => {
                                rej(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }).catch(err => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to delete note from trash
     * @param {*contains note id} noteid 
     */
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

    /**
     * @description: function to empty all trashed notes of a user
     * @param {contains userID} req 
     */
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

    /**
     * @description: function to restore trashed note 
     * @param {*contains note ID} noteId 
     */
    noteRestore(noteId) {
        try {
            return new Promise((res, rej) => {
                let noteid = { "_id": noteId }
                let restore = { "isTrashed": false }
                noteModel.updateSingleNote(noteid, restore).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to add label to existing note
     * @param {*contains label information} updateLabel 
     */
    addLabelToNote(updateLabel) {
        try {
            return new Promise((res, rej) => {
                /**
                 * @description: check for label id in req body if yes then it will add label directly else create the new label and add to note
                 */
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
                        noteModel.updateSingleNote(noteid, query).then((data) => {
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
                        // console.log("data in noteservice after read", data);

                        let noteid = { "_id": updateLabel._id };
                        let query = { $addToSet: { "label": data[0] } }
                        noteModel.updateSingleNote(noteid, query).then((data) => {
                            // console.log("after update in noteservice", data);

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

    /**
     * @description: function to remove label from note
     * @param {contains label ID} deleteLabel 
     */
    removeLabelFromNote(deleteLabel) {
        try {
            return new Promise((res, rej) => {
                let noteId
                (deleteLabel.all) ? noteId = deleteLabel.all : noteId = { "_id": deleteLabel._id };
                let query = { $pull: { "label": deleteLabel.labelID } }
                noteModel.updateNote(noteId, query).then((data) => {
                    res(data)
                }).catch((err) => { rej(err) })
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to set reminder
     * @param {*contains remider status} reminder 
     */
    reminder(reminder) {
        try {
            return new Promise((res, rej) => {
                let dateobj = new Date(reminder.RemindTime).toISOString();
                if (new Date(dateobj) > new Date()) {
                    let note = { "_id": reminder._id }
                    let upload = { "Reminder": reminder.Reminder, "RemindTime": dateobj }
                    noteModel.updateSingleNote(note, upload).then((data) => {
                        res(data)
                    }).catch((err) => {
                        rej(err)
                    })
                } else {
                    rej("Unable to set Reminder..!")
                }
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to search every field of DB for value from user
     * @param {contains value user want to serach from DB} req 
     */
    noteSearch(req) {
        try {
            return new Promise((res, rej) => {
                let data = req.body.search;
                let userID = req.decoded._id
                /**
                 * @description: follows regx to take results from DB
                 */
                let findQuery = {
                    /**
                     * @description: the $and carries out the mandatory functionaliity
                     */
                    $and: [{
                        /**
                         * @description: the $or carries out the optional functionality 
                         */
                        $or:
                            [
                                { 'title': { $regex: data, $options: 'i' } },
                                { 'description': { $regex: data, $options: 'i' } },
                                { 'collaborators': { $regex: data, $options: 'i' } },
                                // {'label':{$in:{$regex:data}}},
                                { 'color': { $regex: data, $options: 'i' } }
                            ]
                    }, { 'userID': userID }]
                }

                noteModel.readNotes(findQuery).then(data => {
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
