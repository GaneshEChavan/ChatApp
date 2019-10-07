 const express = require("express");
 const router = new express.Router();
 const auth = require("./middleware/authentication")
 const Controller = require("./controller/userController")
 const Control = require("./controller/chatController")
let userController = new Controller();
let chatController = new Control();

router.post('/register',userController.registrationController,chatController.chatRegister)

router.post('/login',userController.loginController)

router.post('/forgotPassword',userController.forgotPassword)

router.post('/reset', auth ,userController.resetPassword)

router.post('/allUsers',userController.allUsers)

// router.post('/msg',chatController.chatRegister)

router.post('/getMsg',chatController.getMessages) 

module.exports = router;
// router.post('/allUsers',(req,res)=>{
//     User.find({}).then((users)=>{
//       res.send(users)
//     }).catch((err)=>{
//         res.status(500).send();
//     })
// })

// (req,res)=>{
//     const _id = req.params.id
//     User.findById(_id).then((user)=>{
//         if(!user){
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }).catch((err)=>{
//         res.status(500).send()
//     })
// }



//  const User = require("./app/model/userModel")

// router.post('/register',(req,res)=>{
//     const user = new User(req.body);
//  user.save().then(()=>{
//       res.status(201).send(user)
//  }).catch((err)=>{
//      res.status(400).send()
//  })
// })

// router.get('/register/:id', (req,res)=>{
//     const _id = req.params.id
//     User.findById(_id).then((user)=>{
//         if(!user){
//            return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }).catch((err)=>{
//         res.status(500).send()
//     })
// })

// router.get ('/register/delete/:id',(req,res)=>{
//     const _id=req.params.id
//     User.findByIdAndDelete(_id).then((user)=>{
//      res.status(202).send()
//     }).catch((err)=>{
//        res.status(404).send()
//     })
// })

// router.get('/register/update/:id',(req,res)=>{
//     const _id = req.params.id
//     User.findByIdAndUpdate(_id , { lastName : "Patil"}).then(()=>{
//         res.status(202).send()
//     }).catch((err)=>{
//         res.status(500).send()
//     })
// })

// module.export = router;