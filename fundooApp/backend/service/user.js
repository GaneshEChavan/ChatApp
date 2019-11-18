/***********************************************************************************************************
 *  @Purpose        : To create user services that will perform logical operations on request body and 
 *                    send the incoming data to user Model  
 *  @file           : service/user.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 15-10-2019
 ************************************************************************************************************/

const userModel = require("../model/user");
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
        return new Promise((resolve, reject) => {
            userModel.registrationModel(userData).then(async(data) => {
                if (data.active === false) {
                    let payload = {
                        "_id": data._id,
                        "userName": data.userName,
                        "active": true
                    }
                    let token = await generatedToken.token(payload);
                    let Url = process.env.APPHOST + token;
                    client.HSET(data.userName, process.env.TOKEN, token, redis.print)
                    mailer.nodeMailer(data.userName, Url, data.firstName);
                    resolve({ data, token, Url })
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

            return new Promise((res, rej) => {
                if (result.password === null) {
                    (result.googleLogin === true || result.facebookLogin === true) ? res({ message: "logging in...!", data: result }) : rej({ message: "Incorrect password", err: err });
                } else {
                    bcrypt.compare(userInfo.password, result.password, async (err, Data) => {
                        if (Data) {
                            let payload = {
                                "_id": result._id,
                                "userName": result.userName
                            }
                            let token = await generatedToken.token(payload)


                            res({ message: "logging in...!", data: result, bcryptStatus: Data, token: token })
                            return client.HSET(result.userName, process.env.TOKEN, token, redis.print)
                        } else {
                            rej({ message: "Incorrect password", err: err })
                        }
                    })
                }

            })
        } catch (err) {
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

    resetPassword(idPassword) {
        return new Promise((res, rej) => {
            upload = { "password": idPassword.password };
            userModel.updateToDb(idPassword, upload).then((data) => {
                res(data)
            }).catch((err) => {
                rej(err)
            })
        })

    }

    getAllUsers(data, callback) {
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
            let update = { "imageUrl": image.imageUrl }
            userModel.updateToDb(image, update).then((data) => {
                res({ imgUrl: data })
            }).catch((err) => {
                rej({ message: "Unable to upload in db..!", error: err })
            })
        })
    }


}

module.exports = new ServiceOperations();
