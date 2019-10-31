const EventEmitter = require("events");
const path = require("path")
const nodemailer = require("nodemailer");
require('dotenv').config({ path: __dirname + '../.env' });


module.exports = {
    async nodeMailer(emailId, url) {
        console.log("--------------------------------------------------------------------------------------------------->9",url);
        
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

        let info = await transporter.sendMail(mailOptions);
        console.log(info.response);
        
        
    }
}
