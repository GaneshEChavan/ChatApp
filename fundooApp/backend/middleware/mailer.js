const EventEmitter = require("events");
const path = require("path");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: __dirname + "../.env" });


module.exports = {
    async nodeMailer(emailId,ejsFile) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GUSER,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.GUSER,
            to: emailId,
            subject: "Sending Email using Node.js to reset password",
            html: ejsFile
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(info.response);


    }
};

// `<head>
//        <style>
//        .button {
//         background-color:#555555;
//         border: none;
//         color: white;
//         padding: 15px 32px;
//         text-align: center;
//         text-decoration: none;
//         display: inline-block;
//         font-size: 16px;
//         margin: 4px 2px;
//         cursor: pointer;
//       }
//        </style>
//        </head>
//        <body>
//        <div style="background-color:cornflowerblue">
//        <h1 style:"color:dodgerblue">Welcome to Fundoo App</h1><br>
//        <p> Hey ${name}, Thank you for Registering on App to continue enjoying App please click on button below</p>
//        <a href = ${url}><button class="button">click here</button></a>
//        </div>
//        </body>`