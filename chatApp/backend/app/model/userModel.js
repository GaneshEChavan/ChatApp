const EventEmitter = require("events");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const mailer = require("../../middleware/nodeMailer")
const generatedToken = require("../../middleware/tokenGenerator")


var Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Incorrect EmailId..!")
            }
        }
    },
    mobileNo: {
        type: String,
        required: true,
        validate(value) {
            let regx = /^([7-9]{1})([0-9]{9})$/g
            if (!regx.test(value)) {
                throw new Error("Incorrect Mobile Number ")
            }
        }
    },
    password: {
        type: String,
        required: true
    }
})

let User = mongoose.model("User", Schema)
let Users = User
module.exports = Users;

let bCrypt = (userPassword) => {
    const saltRounds = 8;
    return bcrypt.hashSync(userPassword, saltRounds);

}

class ModelOperations {
    registrationModel(userData, callback) {

        User.findOne({ "emailId": userData.emailId }, (err, data) => {
            if (data === null) {
                var regData = new User({
                    "firstName": userData.firstName,
                    "lastName": userData.lastName,
                    "emailId": userData.emailId,
                    "mobileNo": userData.mobileNo,
                    "password": bCrypt(userData.password)
                })

                regData.save((err, data) => {
                    if (err) {
                         callback(err)
                    } else {
                         callback(null, { message: "successfully registered", data })
                    }
                })
            } else {
                 callback("Email-Id already exists.!")
            }
        })
    }

    logInModel(userInfo, callback) {
        User.findOne({ "emailId": userInfo.emailId }, (err, data) => {
            if (err) {
                 callback({ message: "user not found", err })
            } else if (data !== null) {
                console.log(userInfo.password);
                console.log(data.password);
                
                bcrypt.compare(userInfo.password, data.password, (err, Data) => {
                    if (err) {
                         callback({ message: "incorrect password" })
                    } else if (Data) {
                        let payload = {
                            "emailId": data.emailId
                        }
                        let token = generatedToken.token(payload)
                         callback(null, { message: "logging in...!", data: data, bcryptStatus: Data, token: token })
                    } else {
                         callback(null, { message: "Incorrect Password!", bcryptStatus: Data })
                    }
                })
            } else {
                 callback({ message: "Email id or password is not provided" })
            }
        })
    }

    varifyEmailModel(varifyEmail, callback) {
        User.findOne({ "emailId": varifyEmail.emailId }, (err, data) => {
            console.log(data);
            if (err) {
                 callback({ message: "Invalid Email,Give correct email Id " })
            } else if (data === null) {
                 callback(null, { message: "Email not found...!" })
            } else {
                let payload = {
                    "_id": data._id,
                    "emailId": data.emailId
                }
                let token = generatedToken.token(payload)
                // let emailId = data.emailId; 
                let Url = process.env.RESETHOST + token;

                // const mailEmitter = new mailer();
                mailer.nodeMailer(data.emailId, Url);
                // mailEmitter.emit('sendMail', (data.emailId, Url))

                 callback(null, { data: data, token: token, url: Url })
            }
        })
    }

    setPassword(idPassword, callback) {
        User.findByIdAndUpdate(idPassword._id, { "password": bCrypt(idPassword.password) }, (err, data) => {
            if (err) {
                callback({ message: "password not set.." })
            } else {
                callback(null, { message: "Password set !", data: data })
            }
        })
    }

    searchAll(callback) {
        User.find({}, (err, data) => {
            if (err) {
                callback({ message: "Data not found...!" })
            } else {
                callback(null, { data: data })
            }
        })
    }
}

module.exports = ModelOperations;