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
            // required: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid EmailId..!")
                }
            }
        },
        password: {
            type: String,
            // required: true,
            trim: true
        },
        active: {
            type: Boolean,
            required: true,
            trim: true
        },
        imageUrl: {
            type: String
        },
        googleID: {
            type:String
        },
        googleLogin: {
            type:Boolean
        },
        facebookID: {
            type:String
        },
        facebookLogin: {
            type:Boolean
        }
    },
    { timestamps: true }
)

let User = mongoose.model("User", Schema)

class ModelOperations {
    registrationModel(userData) {
        // console.log("model--->55",userData);
        
        return new Promise((res, rej) => {
            User.findOne({ "userName": userData.userName }).then(data => {
                // console.log("model---->59",data);

                if (data === null) {
                    var regData = new User({
                        "firstName": userData.firstName,
                        "lastName": userData.lastName,
                        "userName": userData.userName,
                        "password": userData.password,
                        "active": userData.active,
                        "googleID":userData.googleID,
                        "googleLogin":userData.googleLogin,
                        "facebookID":userData.facebookID,
                        "facebookLogin":userData.facebookLogin
                    })
                    // console.log("model---->76",regData);
                    regData.save((err, data) => {
                        if (err) {
                            rej(err)
                        } else {
                            // console.log("model---->76",data);

                            res(data)
                        }
                    })
                } else if (data.active === true) {
                    rej("User Already Exists")
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
                } else if (result.active === true || result.googleLogin === true || result.facebookLogin === true) {
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

    updateToDb(data,upload) {
        // console.log("model--->144", image);
        return new Promise((res, rej) => {
            User.findByIdAndUpdate(data._id, upload).then((Data) => {
                // console.log("model--->146", Data);
                res(Data)
            }).catch((err) => {
                rej(err)
            })
        })
    }

    // setPassword(idPassword, callback) {
    //     User.findByIdAndUpdate(idPassword._id, { "password": idPassword.password }, (err, data) => {
    //         if (err) {
    //             callback({ message: "password not set.." })
    //         } else {
    //             callback(null, { message: "Password set !", data: data })
    //         }
    //     })
    // }

    searchAll(data, callback) {
        // console.log(data);

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

    /**
     *  @param {*query object to find from user table} query 
     */
    
    read(query) {
        return new Promise((res, rej) => {
            User.findOne(query).then(data => {
                console.log("read operation in usermodel",data);                
                res(data)
            }).catch(err => {
                rej(err)
            })
        })

    }
   
}

module.exports = new ModelOperations();
