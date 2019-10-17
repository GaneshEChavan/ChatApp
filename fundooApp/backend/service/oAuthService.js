const oAuthModel = require("../model/userModel")
const generatedToken = require("../middleware/token")

class ServiceAuth {
    googleService(googleInfo) {
        return new Promise((res, rej) => {
            oAuthModel.registrationModel(googleInfo).then((data) => {
                let payload = {
                    "_id":data._id,
                    "userName":data.userName
                }
                let token = generatedToken.token(payload)
                res({data,token})
            }).catch((err) => {
                rej(err)
            })
        })
    }

    facebookService(facebookInfo) {
        // console.log("service--->142",facebookInfo);

        return new Promise((res, rej) => {
            oAuthModel.registrationModel(facebookInfo).then((data) => {
                let payload = {
                    "_id":data._id,
                    "userName":data.userName
                }
                let token = generatedToken.token(payload)
                res({data,token})
            }).catch((err) => {
                rej(err)
            })
        })
    }
}

module.exports = new ServiceAuth()