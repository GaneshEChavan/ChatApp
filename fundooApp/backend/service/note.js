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
const elastic = require("../elastic-search/elasticSearch")
const refer = require("../middleware/objGenerate")

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
            return new Promise(async (res, rej) => {
                if (colab.collaborators != undefined && colab.collaborators.length > 0) {

                    /**
                    * @description: creates array of unique values of collaborator ID's
                    * @param {*contains array of collaborator ID's} colab.collaborators 
                    */

                    let checkExistance = await elastic.indexExists()
                    if (checkExistance === true) {
                        let dataToElastic = await refer.createObj(noteData)
                        console.log("47----------------->noteservice", dataToElastic);

                        let result = await elastic.addDocument(dataToElastic)
                        console.log("Added new document to index", result)
                        noteData.elasticID = result._id
                        let unique = Array.from(new Set(colab.collaborators))
                        await noteModel.createNote(noteData).then((Data) => {
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
                    } else {
                        let createIndex = await elastic.initIndex()
                        /**
                         * @description: hence createIndex gives responce object as  { acknowledged: boolean, shards_acknowledged: boolean, index: indexName } when index get created
                         *               so the field is check for key acknowledged:true to confirm index is created 
                         */
                        if (createIndex.acknowledged === true) {
                            let dataToElastic = await refer.createObj(noteData)
                            console.log("89----------------->noteservice", dataToElastic);

                            let result = await elastic.addDocument(dataToElastic)
                            noteData.elasticID = result._id
                            let unique = Array.from(new Set(colab.collaborators))
                            await noteModel.createNote(noteData).then((Data) => {
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
                        }else{

                        }
                    }
                } else {
                    let checkExistance = await elastic.indexExists()
                    if (checkExistance === true) {
                        let dataToElastic = await refer.createObj(noteData)
                        console.log("130----------------->noteservice", dataToElastic);

                        let result = await elastic.addDocument(dataToElastic)
                        noteData.elasticID = result._id
                        noteModel.createNote(noteData).then(data => {
                            res(data)
                        }).catch(err => {
                            rej(err)
                        })
                    } else {
                        let createIndex = await elastic.initIndex()
                        if (createIndex.acknowledged === true) {
                            let dataToElastic = await refer.createObj(noteData)
                            console.log("144----------------->noteservice", dataToElastic);

                            let result = await elastic.addDocument(dataToElastic)
                            noteData.elasticID = result._id
                            noteModel.createNote(noteData).then(data => {
                                res(data)
                            }).catch(err => {
                                rej(err)
                            })
                        }
                    }
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
        console.log("165------------>noteservice", body);

        try {
            return new Promise(async (res, rej) => {
                let noteid = { "_id": body._id }
                noteModel.readNotes(noteid).then(async (data) => {

                    /**
                    * @description: used turnary operator to make new object with requested changes
                    */
                    let noteChanges = {
                        "title": body.title ? body.title : data[0].title,
                        "description": body.description ? body.description : data[0].description,
                        "color": body.color ? body.color : data[0].color,
                        // "collaborators":body.collaborators ? { $addToSet: { "collaborators": id } } : data[0].collaborators,
                        "isArchive": (body.isArchive == true || data[0].isArchive) ? true : false,
                        "isPinned": (body.isPinned == true || data[0].isPinned) ? true : false,
                        "Reminder": (body.Reminder == true || data[0].Reminder) ? true : false
                    }

                    await noteModel.updateSingleNote(noteid, noteChanges).then(async (Data) => {
                        if (body.collaborators && body.collaborators.length > 0) {
                            /**
                            * @description: creates array of unique values of collaborator ID's 
                            */
                            let unique = Array.from(new Set(body.collaborators))
                            unique.forEach(id => {
                                let search = { "_id": id }
                                userModel.read(search).then(DAta => {
                                    let Search = { "_id": data[0]._id };
                                    let update = { $addToSet: { "collaborators": id } }
                                    noteModel.updateSingleNote(Search, update).then(async data => {
                                        let payload = { "title": data.title, "description": data.description }
                                        let result = await elastic.updateDocument(data.elasticID, payload)
                                        console.log("---->189", result);

                                        /**
                                        * @description: called function from same file to save changes made, in redis 
                                        */
                                        let userid = {
                                            userID: data.userID
                                        }
                                        this.userNotes(userid)
                                        let User = data.userID
                                        let redis = "isArchive"
                                        let Redis = "Reminder"
                                        this.getList(User, redis)
                                        this.getList(User, Redis)
                                        res("Notes updated..!")
                                    }).catch(err => {
                                        rej(err)
                                    })
                                }).catch(err => {
                                    logger.info("error of update api in noteservice", err)//<---------
                                })
                            })
                        } else {
                            let userid = {
                                userID: Data.userID
                            }
                            this.userNotes(userid)
                            let User = { "userID": Data.userID, "isArchive": true }
                            let redis = "isArchive"
                            this.getList(User, redis)
                            let user = { "userID": Data.userID, "Reminder": true }
                            let Redis = "Reminder"
                            this.getList(user, Redis)

                            let payload = { "title": Data.title, "description": Data.description }
                            let result = await elastic.updateDocument(Data.elasticID, payload)
                            logger.info(result);
                            console.log("Elastic Update Status in Note Service", result)
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
        /**
        * @description: used try catch block for exception handling
        */
        try {
            return new Promise((res, rej) => {
                let userinfo = { "userID": user.userID }
                noteModel.readNotes(userinfo).then(data => {
                    // console.log("262----->noteservice",data);

                    let buff = new Buffer.from(JSON.stringify(data))
                    // client.SET(data[0].userID + 'notes', buff)
                    client.HSET(data[0].userID, process.env.NOTE, buff)
                    res(data)
                }).catch(err => {
                    rej(err)
                })
            })
        } catch (err) {
            return err
        }
    }

    /**
    * @description: this method is for paginating the notes takes user object and pass to model
    * @param {*contains userID and options object} user 
    */
    notePages(user) {
        /**
        * @description: used try catch block for exception handling
        */
        try {
            /**
             * @description: return async promise in which passing userID and option query to model. Used async await to wait function for response
             */
            return new Promise(async (res, rej) => {
                let userinfo = { "userID": user.userID }
                await noteModel.countNotes(userinfo, user.query).then((data) => {
                    res(data)
                }).catch((err) => {
                    rej(err)
                })
            })

        } catch (err) {

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
                    let user = {
                        userID: data.userID
                    }
                    /**
                     * @description: called function from same file to update redis-cache too
                     */
                    this.userNotes(user)
                    let User = data.userID
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
                    client.HSET(data[0].userID, redis + `-${process.env.TRUE}`, buff)
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
            return new Promise(async (res, rej) => {
                let note = { "_id": noteid._id }
                noteModel.permanentDelete(note).then(async data => {
                    let result = await elastic.deleteDocument(data.elasticID)
                    logger.info(result)
                    res(data)
                }).catch(err => {
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
            return new Promise(async (res, rej) => {
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
                        noteModel.updateSingleNote(noteid, query).then(async (data) => {
                            console.log("475------------>", data);
                            // let label = {"labelName"}
                            // let result = await elastic.updateDocument(data.elasticID)                           
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
                            console.log("after update in noteservice", data);

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
