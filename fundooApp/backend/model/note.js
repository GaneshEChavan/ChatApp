/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : model/noteModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");
let cron = require("node-cron");
const logger = require("../../logger/logger");
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
            type: Date,
            default: null
        },
        elasticID: {
            type: String,
            required: true
        },
        collaborators: [{
            type: String,
            default: null
        }],
        label: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Labels"
        }]
    },
    { timestamps: true },
    { strict: true }
);

/**
* @description: creating mongoose model to make notes table in DataBase
*/

let Notes = mongoose.model("Notes", Schema);

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
                "RemindTime": noteData.RemindTime,
                "label": noteData.label,
                "elasticID": noteData.elasticID
            });
            /**
            * @description: saves new generated note schema to DB
            */
            return note.save();
        } catch (err) {
            return err;
        }
    }

    /**
     * @description: countNotes method takes userID count all the notes of user then call find method with mongoose query options and returns paginated data 
     *               and total number of pages according to size 
     * @param {contains userID object to count notes of} query 
     * @param {*contains options to pass mongo find method} userQuery 
     */
    countNotes(query, userQuery) {

        try {
            return new Promise((res, rej) => {
                Notes.countDocuments(query).then(count => {
                    this.readNotes(query, userQuery).then(data => {
                        /**
                         * @description: Math.ceil rounds a number up to the next largest whole number
                         */
                        var totalPages = Math.ceil(count / userQuery.limit);
                        let Data = { data, totalPages };
                        res(Data);
                    }).catch(err => {
                        rej(err);
                    });
                }).catch(err => {
                    rej(err);
                });
            });

        } catch (err) {
            return err;
        }
    }
    /**
    * @description: function to read all notes  
    * @param {*contains note id} query 
    */
    readNotes(query, pageQuery) {
        try {
            /**
            * @description: check for user is already exists, if yes then rejected else created , find method accepts 3 param and one callback , First is and 
            *               filter query that on what field we want to find documents, second is fields i.e what fields we want from DB, Third is options that
            *               we want to pass while filtering. populate is mongo option to show label in notes taking reference of label DB.
            * @param {*query object contains userID to find notes of} query
            * @param {* is an fields we want to take from DB} {}
            * @param {* is object contains options like skip and limit} pageQuery 
            */
            return Notes.find(query, {}, pageQuery).populate("label");
        } catch (err) {
            return err;
        }
    }

    /**
    * @description: function to read all notes  
    * @param {*contains note id} query
    * @param {*contains data to be updated}update
    */
    updateNote(query, update) {
        try {
            return Notes.updateMany(query, update, { new: true }).populate("label");
        } catch (err) {
            return err;
        }
    }

    /**
    * @description: function to update a notes  
    * @param {*contains note id} query
    * @param {*contains data to be updated}update
    */
    updateSingleNote(query, update) {
        try {
            return Notes.findOneAndUpdate(query, update, { new: true }).populate("label");
        } catch (err) {
            return err;
        }
    }

    /**
    * @description: function to delete a notes  
    * @param {*contains note id} note
    */
    permanentDelete(note) {
        try {
            return Notes.findByIdAndDelete(note);
        } catch (err) {
            return err;
        }
    }

    /**
    * @description: function to delete all notes from trash  
    * @param {*contains note id} trash
    */
    deletetrash(trash) {
        try {
            return Notes.deleteMany(trash);
        } catch (err) {
            return err;
        }
    }

    /**
    * @description: schedular function to work for every minute. this schedule function is look for non archived notes which are not used for long time so it will archive it 
    *               if difference in last updated and current date is greater than 30 days.  
    */
    oldNoteSchedular() {
        cron.schedule("* * * * *", () => {
            this.readNotes({ "isArchive": false }).then(data => {
                data.forEach(note => {
                    /**
                    * @description: logic for calculating the difference between current and last updated date in value of number of days
                    */

                    let updateDate = new Date(note.updatedAt);
                    let currDate = new Date();
                    let Difference_In_Time = currDate.getTime() - updateDate.getTime();
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                    /**
                    * @description: turnery operator to update note if difference is above 30 days then it will 
                    */

                    Difference_In_Days > 30 ? this.updateSingleNote({ "_id": note._id }, { "isArchive": true }) : new Error("Something went wrong..!");
                });
            }).catch(err => {
                logger.info("ERROR in Schedular", err);
            });
        });
    }

    /**
     * @description: schedular function to work for every 15 seconds to check for reminders and sorting them in ascending order. this schedule function will check for all reminder 
     *               values in dataBase, then if the reminder time is passed away then it will set to false and sort between the remaining notes every 15 seconds 
     */
    remindSchedular() {
        /**
         * @description: first star is of seconds and /15 confirms that it will run every 15 minutes,second is of minute,third for hour,fourth for day of month,fifth for month,
         *               sixth is for day of week, second argument is function/operation to do.
         */
        cron.schedule("*/15 * * * * *", () => {
            /**
             * @description: first it filter out all the notes who had reminder time then runFirst and runSecond are two various functions that have to execute one after one.  
             *               first function check for passed reminder values and set them to null AND second sort the notes on basis of reminder time
             */

            this.readNotes({ "Reminder": true }).then(data => {
                /**
                 * @description: hence "this" keyword is not operatable inside these functions, variable self is declared as "this" and can be used under the functions.   
                 */
                let self = this;
                function runFirst(data, callback) {
                    data.forEach(obj => {
                        /**
                         * @description: check for reminder time is less than current time, if yes then it will set it to null and proceed further to second function
                         */
                        if (new Date(obj.RemindTime) < new Date()) {
                            let note = { "_id": obj._id };
                            let update = { "RemindTime": null, "Reminder": false };
                            self.updateSingleNote(note, update).then(data => {
                                self.readNotes({ "Reminder": true }).then(data => {
                                }).catch(err => {
                                    callback(err);
                                });
                            }).catch(err => {
                                callback(err);
                            });
                        }
                    });
                    /**
                     * @description; called second function to sort notes who has reminder set
                     */
                    self.readNotes({ "Reminder": true }).then(data => {
                        runSecond(data);
                    }).catch(err => {
                        logger.error(err);
                    });
                }

                /**
                 * @description: this function will take notes with reminder true and sort them in ascending order 
                 * @param {*contains notes with reminder set to true} newdata 
                 */
                function runSecond(newdata) {
                    for (let j = 0; j < newdata.length; j++) {
                        for (let i = 0; i < newdata.length - 1; i++) {
                            let reminderDateOne = new Date(newdata[i].RemindTime);
                            let reminderDateTwo = new Date(newdata[i + 1].RemindTime);
                            let currentDate = new Date();
                            if ((reminderDateOne.getTime() - currentDate.getTime()) > (reminderDateTwo.getTime() - currentDate.getTime())) {
                                let temporary = newdata[i + 1];
                                newdata[i + 1] = newdata[i];
                                newdata[i] = temporary;
                            }
                        }
                    }
                    // console.log(newdata)
                    return newdata;
                }
                runFirst(data);
            }).catch(err => {
                logger.error(err);

            });
        });
    }

}

let schedule = new ModelNote();
schedule.oldNoteSchedular();
schedule.remindSchedular();
module.exports = new ModelNote();
