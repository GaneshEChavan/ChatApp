/******************************************************************************
 *  @Purpose        : To create a collaborator schema and store data into database.
 *  @file           : model/noteModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");

let Schema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        collaboratorID: {
            type: String,
            required: true
        },
        noteID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notes"
        }]
    },
    {timestamps : true}
)

let collaborate = mongoose.model("collaborate", Schema)

class ModelCollaborator {

    create(colaborator) {
        return new Promise((res, rej) => {
            let collaborat = new collaborate({
                "userID": colaborator.userID,
                "collaboratorID": colaborator.collaboratorID,
                "noteID": colaborator.noteID
            })
            collaborat.save((err, data) => {
                if (err) {
                    rej(err)
                } else {
                    res(data)
                }
            })
        })
    }

    read(query){
        return new Promise((res,rej)=>{
            collaborate.find(query).then(data=>{
                  res(data)
            }).catch(err=>{
                  rej(err)
            })
        })
    }
}

module.exports = new ModelCollaborator()