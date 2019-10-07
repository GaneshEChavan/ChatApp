const jwt = require("jsonwebtoken");
const User = require("../app/model/userModel")
require('dotenv').config({path: __dirname+'../env'});

const auth = (req, res, next) => {

    const token = req.header("token")
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY , (err, data) => {
            if (err) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Unauthorised User..'
                    });
            }
            else {
                req.token = data;
                console.log("Authentication Successful...!")
                next();
            }
            return data;
        });
    }
    else {
        return res.status(401).json(
            {
                success: false,
                message: 'No token found in header..Unauthorised User.'
            });
    }





    //     jwt.verify(token,'newtoken', (err,data)=>{
    //         if(err){
    //             res.status(400).send()
    //         }
    //     })
    //     // const user = User.findOne({"emailId": decoded.emailId,'token':token})

    //     if(!user){
    //         throw new Error()
    //     }
    //      req.user = user
    //     next()
    //   }catch(err){
    //       res.status(401).send({error:"please authenticate.."})
    //   }

};

module.exports = auth;