const express = require("express")
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser")
var mongo = require("./dbConfig/dbConfiguration");
const userRouter = require("./routes")
const controller = require("./controller/chatController")
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();


app.use(express.static('./front_end'));
// app.use(express.static(path.join(__dirname,'../front_end')))

app.use(bodyParser.json());

app.use('/', userRouter);

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("New webSocket connection !");

    //  socket.emit('message', "Welcome To Chat Planet")

    socket.on('sendMessage', (message) => {
        let cntrl = new controller();
        console.log("sendMessage socket on server--->29",message)
        cntrl.chatRegister(message, (err, data) => {
            if (err) {
                console.log("Error Occured", err)
            } else {
                console.log("data of message saved---->34",data);
                io.emit('messages', data)
            }
        })
    })

})

server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
    mongo.connect
});










// app.get('/register', (req, res) => {
//     res.sendFile("/home/admin1/GC/BLabz_Work/chatApp/front_end/templates/registration_page.html")
// })

// app.get('/login', (req, res) => {
//     res.sendFile("/home/admin1/GC/BLabz_Work/chatApp/front_end/templates/login_page.html")
// })

// app.get('/forgotpassword', (req, res) => {
//     res.sendFile("/home/admin1/GC/BLabz_Work/chatApp/front_end/templates/forgot_password.html")
// })























































// var Schema = mongoose.Schema;
// const User = mongoose.model("User", new Schema({
//     firstName: {
//         type: String
//     },
//     lastName: {
//         type: String
//     },
//     emailId: {
//         type: String
//     },
//     mobileNo: {
//         type: Number
//     },
//     password: {
//         type: String
//     }
// }));

// let person = new User({
//     firstName: "Jack",
//     lastName: "Sparrow",
//     emailId: "jacks123@gmail.com",
//     mobileNo: 9876543210,
//     password: "password"
// });

// person.save().then(()=>{
//     console.log(person)
// }).catch((err)=>{
//    console.log("Error!",err)
// })
