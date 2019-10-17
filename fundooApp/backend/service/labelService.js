const labelModel = require("../model/labelModel");

class ModelLabel {
    newLabel(label){
        try{
        return new Promise((res,rej)=>{
            labelModel.createLabel(label).then((data)=>{
                res(data)
            }).catch((err)=>{
                rej(err)
            })
        })
        }catch(err){
            return err
        }
    }

    labelRead(userid){
        try{
        return new Promise((res,rej)=>{
            labelModel.readLabel(userid).then((data)=>{
                res(data)
            }).catch((err)=>{
                rej(err)
            })
        })
        }catch(err){
          return err
        }
    }
}

module.exports = new ModelLabel()