/******************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : model/userModel.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 14-10-2019
 ******************************************************************************/

const mongoose = require("mongoose");
const validator = require("validator");

/**
 * @description:Creating user schema using mongoose
 **/

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
            // required: true,
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
    { timestamps: true },
    { strict : true}
)

/**
 * @description: defining mongoose model to save in mongoDB as User table
 */

 let User = mongoose.model("User", Schema)

/**
 * @description: created class to wrap CRUD operations
 */

 class ModelOperations {
    /**
     * @description: function to create and save user in database
     * @param {*contains user info} userData 
     */

     registrationModel(userData) {
        /**
         * @description: handled the create operation using promise
         */

         
            /**
             * @description: check for user is already exists, if yes then rejected else created
             * @method: takes an object to find a entry in database
             */

           return  User.findOne({ "userName": userData.userName }).then(data => {
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
                    /**
                     * @description: saves new generated user schema to DB
                     */
                   return regData.save()
                } else if (data.active === true) {
                   return "User Already Exists"
                } else {
                   return ({ message: "please register first to continue..!", data: data })
                }
            }).catch(err => {
                return ("Error : Something Went Wromg", err)
            })
    }

    /**
     * @description: function to check and verify that requsted user is already generated and authenticate 
     * @param {*contains user email and password} userInfo 
     */

    logInModel = async (userInfo) => {
        try {
            let result = await User.findOne({ "userName": userInfo.userName })
            return new Promise((res, rej) => {
                if (result === null) {
                    rej({ message: "User is not registered ..!" })
                } else if (result.active === true || result.googleLogin === true || result.facebookLogin === true) {
                    res(result)
                } else {
                    rej({ message: "User is not registered ..!" })
                }
            })
        } catch (err) {
            return err
        }
    }

    /**
     * @description: function to verify that requsted user while forgot password 
     * @param {*contains user email} varify 
     */

    varifyEmailModel(varify) {
        try{
            return User.findOne({ "userName": varify.userName })
        }catch(err){
              return err
        }
    }


    /**
     * @description: function to find user by its unique id and update info 
     * @param {*contains user email and password} data
     * @param {*contains upload information} upload 
     */

    updateToDb(data,upload) {
        try{
            return User.findByIdAndUpdate(data._id, upload)
        }catch(err){
            return err
        }
    }

     /**
     * @description: function to find all users done using callback  
     * @param {*contains empty object} data
     * @param {*callback function} callback  
     */

    searchAll(data, callback) {
        User.findByIdAndUpdate(data._id, { "active": data.active }, (err, Data) => {
            if (err) {
                callback({ message: "Unable to register.." })
            } else {
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
        try{
           return User.findOne(query)
        }catch(err){
           return err
        }
    }   
}

module.exports = new ModelOperations();
