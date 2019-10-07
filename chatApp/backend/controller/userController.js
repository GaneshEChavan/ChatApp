const Service = require("../services/userService");

let userService = new Service();

class ControllerMethods {
   registrationController(req, res) {
        
    var userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            mobileNo: req.body.mobileNo,
            password: req.body.password
        }
        userService.registrationService(userData, (err, data) => {
            if (err) {
                return res.status(400).send(err)
            } else {
                return res.status(201).send(data)
            }
        });
    }

    loginController(req, res) {
        var userInfo = {
            emailId: req.body.emailId,
            password: req.body.password
        }
        userService.logInService(userInfo, (err, data) => {
            if (err) {
                return res.status(404).send()
            } else {
                return res.status(200).send(data)
            }
        })
    }

    forgotPassword(req, res) {        
        var varifyEmail = {
            emailId: req.body.emailId
        }
        userService.forgotPassword(varifyEmail, (err, data) => {
            if (err) {
                return res.status(404).send(err)
            } else {
                console.log("----->43",data)
                return res.status(202).send(data)
            }
        })
    }

    resetPassword(req,res){
        // console.log(req.body.password,req.token)
        let idPassword = {
            _id : req.token._id,
            password : req.body.password
        }
        userService.resetPassword(idPassword,(err,data)=>{
            if(err){
                return res.status(400).send(err)
            }else{
                return res.status(200).send(data)
            }
        })
    }

    allUsers(req,res){
       userService.getAllUsers((err,data)=>{
           if(err){
               return res.status(400).send(err)
           }else{
               return res.status(200).send(data)
           }
       })  
    }
}

module.exports = ControllerMethods;