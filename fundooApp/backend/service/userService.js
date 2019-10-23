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
        console.log("service---->16", userData);

        return new Promise((resolve, reject) => {
            userModel.registrationModel(userData).then((data) => {
                //    console.log("service---->20",data);
                //    console.log("service---->21",data.active);
                //    console.log("service---->22",data.userName);
                if (data.active === false) {
                    let payload = {
                        "_id": data._id,
                        "userName": data.userName,
                        "active": true
                    }
                    let token = generatedToken.token(payload);
                    // console.log("service--->29",token);

                    let Url = process.env.APPHOST + token;
                    // console.log("service--->32",Url);

                    mailer.nodeMailer(data.userName, Url);
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
            console.log("service----->49", result);

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

                            // token set to the redis using params userName

                            client.setex(result.userName + 'token', 86400, token, redis.print)

                            res({ message: "logging in...!", data: result, bcryptStatus: Data, token: token })
                        } else {
                            rej({ message: "Incorrect password", err: err })
                        }
                    })
                }

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

    resetPassword(idPassword) {
        return new Promise((res, rej) => {
            upload = { "password": idPassword.password };
            userModel.updateToDb(idPassword,upload).then((data) => {
                res(data)
            }).catch((err) => {
                rej(err)
            })
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
