const collaborateModel = require("../model/collaborateModel")

class ServiceCollaborate {

    colabAdd(colaborator){
        return new Promise((res,rej)=>{
            collaborateModel.create(colaborator).then(data=>{
                res(data)
            }).catch(err=>{
                rej(err)
            })
        })
    }

}

module.exports = new ServiceCollaborate();