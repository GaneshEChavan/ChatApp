/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : model/noteModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");
let cron = require("node-cron");
const logger = require("../../logger/logger")
/**
 * @description:Creating note schema using mongoose
 **/
let Schema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        color: {
            type: String,
            trim: true
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
        RemindTime: {
            type: String,
            default: null
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
    { timestamps: true },
    { strict: true }
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
            return note.save()
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
            /**
            * @description: check for user is already exists, if yes then rejected else created
            * @method: takes an object to find a entry in database
            */
            return Notes.find(query).populate('label')
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
            return Notes.updateMany(query, update, { new: true }).populate('label')
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
            return Notes.findOneAndUpdate(query, update, { new: true }).populate('label')
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
            return Notes.findByIdAndDelete(note)
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
            return Notes.deleteMany(trash)
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

                    let updateDate = new Date(note.updatedAt);
                    let currDate = new Date();
                    let Difference_In_Time = currDate.getTime() - updateDate.getTime();
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
    remindSchedular() {
        cron.schedule('*/55 * * * * *', () => {
            this.readNotes({ "Reminder": true }).then(data => {
                /**
                 * @description: Using selection sorting method for arranging notes in increasing order of reminders. 
                 */
                for (let i = 0; i < data.length; i++) {
                    let select = i;
                    for (var j = i + 1; j < data.length; j++) {
                        let reminderDate = new Date(obj.RemindTime)
                        let currentDate = new Date()
                        if (array[j] < array[select]) {
                            select = j;
                        }
                    }
                    let temporary = data[i];
                    data[i] = data[select];
                    data[select] = temporary;
                }
                // data.forEach((obj,i) => {
                //     let reminderDate = new Date(obj.RemindTime)
                //     let currentDate = new Date()
                //     if(currentDate.getTime() <= reminderDate.getTime()){
                //         let temp = data[i];
                //         data[i+1]=data[i];
                //         data[i]=temp     
                //     }
                //     // console.log(reminderDate.getTime()-currentDate.getTime());
                //     // console.log(data);
                // })
                console.log(data)

            }).catch(err => {
                logger.error(err);

            })
        })
    }

}

let schedule = new ModelNote();
schedule.oldNoteSchedular();
// schedule.remindSchedular()
module.exports = new ModelNote()
