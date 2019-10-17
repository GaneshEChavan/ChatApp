const mongoose = require("mongoose");

let Schema = mongoose.Schema(
    {
        userID:{
           type:String
        },
        labelName: {
            type: String
        },
        isDeleted:{
            type:Boolean
        }
    },
    {timestamps : true}
)

let Label = mongoose.model("Labels", Schema)

class ModelLabel {
    createLabel(label){
        try{
          return new Promise((res,rej)=>{
            let newLabel = new Label({
              "userID":label.userID,
              "labelName":label.labelName,
              "isDeleted":label.isDeleted
            })
            newLabel.save((err,data)=>{
                if(err){
                    rej(err)
                }else{
                    res(data)
                }
            })
          })
        }catch(err){
             return err
        }    
    }

    readLabel(){
        try{
    return new Promise((res,rej)=>{
        Label.find
    })
        }catch(err){
            return err
        }
    }
}

module.exports = new ModelLabel()
