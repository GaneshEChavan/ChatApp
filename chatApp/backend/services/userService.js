const Model = require("../app/model/userModel");

let userModel = new Model();

 class ServiceOperations {
    registrationService = new Promise((resolve,reject)=>{
        
    }).then(()=>{}).catch(()=>{

    })

    logInService(userInfo, callback) {
        userModel.logInModel(userInfo, (err, data) => {
            if (err) {
                 callback(err)
            } else {
                 callback(null, data)
            }
        })
    }

    forgotPassword(varifyEmail, callback) {
        userModel.varifyEmailModel(varifyEmail, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    resetPassword(idPassword, callback) {
        userModel.setPassword(idPassword, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    getAllUsers(callback){
        userModel.searchAll((err,data)=>{
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
}


module.exports = ServiceOperations;