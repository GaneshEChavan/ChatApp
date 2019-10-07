const mongoose = require("mongoose");
const validator = require("validator");



var Schema = mongoose.Schema(
    {
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
        userName: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid EmailId..!")
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        active: {
            type: Boolean,
            required: true,
            trim: true
        },
        imageUrl: {
            type: String
        }
    },
    { timestamps: true }
)

let User = mongoose.model("User", Schema)

class ModelOperations {
    registrationModel(userData) {
        return new Promise((res, rej) => {
            User.findOne({ "userName": userData.userName }).then(data => {
                // console.log("model---->46",data);

                if (data === null) {
                    var regData = new User({
                        "firstName": userData.firstName,
                        "lastName": userData.lastName,
                        "userName": userData.userName,
                        "password": userData.password,
                        "active": userData.active
                    })
                    regData.save((err, data) => {
                        if (err) {
                            rej(err)
                        } else {
                            // console.log("model---->60",data);

                            res({ message: "Check email for varification..!", data: data })
                        }
                    })
                } else if (data.active === true) {
                    rej({ message: "Email-Id already exists.!", data: data })
                } else {
                    rej({ message: "please register first to continue..!", data: data })
                }
            }).catch(err => {
                rej("Error : Something Went Wromg", err)
            })
        })
    }

    logInModel = async (userInfo) => {
        try {
            // console.log(userInfo);

            let result = await User.findOne({ "userName": userInfo.userName })
            //   console.log("model---->",result);

            return new Promise((res, rej) => {
                if (result === null) {
                    rej({ message: "User is not registered ..!" })
                } else if (result.active === true) {
                    // console.log("model---->81",result);
                    res(result)
                } else {
                    rej({ message: "User is not registered ..!" })
                }
            })
        } catch (err) {
            return err
        }
    }

    varifyEmailModel(varify) {
        return new Promise((res, rej) => {
            User.findOne({ "userName": varify.userName }).then(data => {
                res(data)
            }).catch(err => {
                rej(err)
            })
        })

    }

    setPassword(idPassword, callback) {
        User.findByIdAndUpdate(idPassword._id, { "password": idPassword.password }, (err, data) => {
            if (err) {
                callback({ message: "password not set.." })
            } else {
                callback(null, { message: "Password set !", data: data })
            }
        })
    }

    searchAll(data, callback) {
        console.log(data);

        User.findByIdAndUpdate(data._id, { "active": data.active }, (err, Data) => {
            if (err) {
                callback({ message: "Unable to register.." })
            } else {
                // console.log("model---->128",Data);
                User.find({}, (err, data) => {
                    if (err) {
                        callback({ message: "Data not found...!" })
                    } else {
                        callback(null, { data: data })
                    }
                })
            }
        })
    }

    addToDb(image) {
        // console.log("model--->144", image);
        return new Promise((res, rej) => {
            User.findByIdAndUpdate(image._id, { "imageUrl": image.imageUrl }).then((Data) => {
                console.log("model--->146", Data);
                res(Data)
            }).catch((err) => {
                rej(err)
            })
        })
    }
}

module.exports = new ModelOperations();
