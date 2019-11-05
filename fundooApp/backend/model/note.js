/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : model/noteModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");
var cron = require("node-cron");
const logger = require("../../logger/logger")
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
            required: true
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
        RemindTime:{
            type:String,
            default:null
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

/**
* @description: creating mongoose model to make notes table in DataBase
*/

let Notes = mongoose.model("Notes", Schema)

/**
* @description: created class to wrap CRUD operations for notes 
*/

class ModelNote {
    /**
    * @description: create operation for note
    * @param {*contains note information to be stores in DB} noteData 
    */
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
                /**
                * @description: saves new generated note schema to DB
                */
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

    /**
    * @description: function to read all notes  
    * @param {*contains note id} query 
    */
    readNotes(query) {
        try {
            return new Promise((res, rej) => {
                /**
                * @description: check for user is already exists, if yes then rejected else created
                * @method: takes an object to find a entry in database
                */               
                Notes.find(query).populate('label').then((data) => {
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
    * @description: function to read all notes  
    * @param {*contains note id} query
    * @param {*contains data to be updated}update
    */
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

    /**
    * @description: function to update a notes  
    * @param {*contains note id} query
    * @param {*contains data to be updated}update
    */
    updateSingleNote(query, update) {
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

    /**
    * @description: function to delete a notes  
    * @param {*contains note id} note
    */
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

    /**
    * @description: function to delete all notes from trash  
    * @param {*contains note id} trash
    */
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

    /**
    * @description: schedular function to work for every 45 seconds 
    */
    oldNoteSchedular() {
        cron.schedule('* * * * *', () => {
            this.readNotes({}).then(data => {
                data.forEach(note => {

                    /**
                    * @description: logic for calculating the difference between current and last updated date
                    */

                    let date1 = new Date(note.updatedAt);
                    let date2 = new Date();
                    let Difference_In_Time = date2.getTime() - date1.getTime();
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

                    /**
                    * @description: turnery operator to update note if difference is above 30 days
                    */

                    Difference_In_Days > 30 ? this.updateSingleNote({ "_id": note._id }, { "isArchive": true }) : new Error("Something went wrong..!")
                });
            }).catch(err => {
                logger.info('ERROR in Schedular', err);
            })
            // console.log('running a task every 45 second');
        });
    }

    /**
     * @description: schedular function to work for every seconds
     */
    // remindSchedular(){
    //     cron.schedule('* * * * * *',()=>{
    //         this.readNotes({}).then(data=>{

    //         }).catch(err=>{

    //         })
    //     })
    // }

}

let schedule = new ModelNote();
schedule.oldNoteSchedular();
module.exports = new ModelNote()
