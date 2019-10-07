const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const generatedToken = require("../middleware/token")
const mailer = require("../middleware/mailer")

var redis = require("redis");
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});


class ServiceOperations {
    registrationService(userData) {
        // console.log("service---->9", userData);;

        return new Promise((resolve, reject) => {
            userModel.registrationModel(userData).then((data) => {
                if (data.data.active === false) {
                    let payload = {
                        "_id": data.data._id,
                        "userName": data.data.userName,
                        "active": true
                    }
                    let token = generatedToken.token(payload);
                    let Url = process.env.APPHOST + token;
                    mailer.nodeMailer(data.data.userName, Url);
                    resolve({ data: data, token: token, url: Url })
                } else {
                    reject({ data: data })
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    logInService = async (userInfo) => {
        try {
            let result = await userModel.logInModel(userInfo)
            //    console.log("service----->33",result);

            return new Promise((res, rej) => {
                bcrypt.compare(userInfo.password, result.password, async (err, Data) => {
                    if (Data) {
                        let payload = {
                            "_id":result._id,
                            "userName": result.userName
                        }
                        let token = await generatedToken.token(payload)

                        // token set to the redis using params userName

                        client.set(result.userName, token, redis.print)

                        res({ message: "logging in...!", data: result, bcryptStatus: Data, token: token })
                    } else {
                        rej({ message: "Incorrect password", err: err })
                    }
                })
            })
        } catch (err) {
            // console.log("service---->48",err)
            return err
        }
    }

    forgotPassword(varifyEmail) {
        return new Promise((res, rej) => {
            userModel.varifyEmailModel(varifyEmail).then(data => {
                let payload = {
                    "_id": data._id,
                    "userName": data.userName
                }
                let token = generatedToken.token(payload);
                let Url = process.env.RESETHOST + token;
                mailer.nodeMailer(data.userName, Url);
                res({ data: data, token: token, url: Url })
            }).catch(err => {
                rej(err)
            })

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

    getAllUsers(data, callback) {
        console.log("service--->81", data);

        userModel.searchAll(data, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    imageUpload(image) {
        return new Promise((res, rej) => {
            userModel.addToDb(image).then((data) => {
                res({ imgUrl: data })
            }).catch((err) => {
                rej({ message: "Unable to upload in db..!", error: err })
            })
        })
    }
}

module.exports = new ServiceOperations();
