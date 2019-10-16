const mongoose = require("mongoose");

var Schema = mongoose.Schema(
    {
        userID: {
            type: String,
            required:true
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        color: {
            type: String
        },
        isArchive: {
            type: Boolean,
            default:false
        },
        isPinned: {
            type: Boolean,
            default:false
        },
        isTrashed: {
            type: Boolean,
            default:false
        },
        image: {
            type: String,
            default:null
        },
        Reminder: {
            type: Boolean,
            default:false
        },
        label: {
            type: Object
        }
    },
    { timestamps: true }
)

let Note = mongoose.model("Notes", Schema)

class ModelNote {
    createNote(noteData) {
        return new Promise((res, rej) => {
            let note = new Note({
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

            note.save((err,data)=>{
                if(err){
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
    }
}

module.exports = new ModelNote()