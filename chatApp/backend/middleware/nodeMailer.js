const EventEmitter = require("events");
const nodemailer = require("nodemailer");
require('dotenv').config({path: __dirname+'../env'});


// class Mailer extends EventEmitter {
//     send(emailId , url){
//         this.on('sendMail',(emailId , url)=>{
         
//             })
//     }

module.exports = {
    nodeMailer(emailId , url) {
        console.log("----14",emailId,url,process.env.GUSER,process.env.PASSWORD);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GUSER,
                pass: process.env.PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.GUSER,
            to: emailId,
            subject: 'Sending Email using Node.js to reset password',
            text: `Click the following link to reset password : ${url}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error is----->",error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
