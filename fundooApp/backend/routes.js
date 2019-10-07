const express = require("express");
const routes = new express.Router();
const controller = require("./controller/userController")
const authenticate = require("./middleware/authentication")
const cache = require("./middleware/cache")
const upload = require("./middleware/fileUploader")

routes.post('/register', controller.register)

routes.post('/login', cache, controller.login)

routes.post('/forgot', controller.forget)

routes.post('/reset', authenticate, controller.reset)

routes.post('/allUsers', authenticate, controller.allUsers)

// const singleUpload = upload.single('image')

routes.post('/image-upload', authenticate, upload.single('image'), controller.imgUpload 
// (req,res)=>{
//     console.log(req.file);
    
//     {
//         if (!req.file) {
//           console.log("No file received");
//           return res.send({
//             success: false
//           });
      
//         } else {
//           console.log('file received');
//           return res.send({
//             success: true,
//             imageUrl: req.file.location
//           })
//         }
//       }
// }
// function (req, res) {
    // console.log("routes-->21",req.file);
    
    // singleUpload(req, res, function (err) {
    //     if (err) {
    //         res.status(422).send({ message: "file upload error", error: err })
    //     }
    //     return res.json({ 'imageUrl': req.file.location})
    //     // return res.json({data:res})
    // })
// }
)

module.exports = routes