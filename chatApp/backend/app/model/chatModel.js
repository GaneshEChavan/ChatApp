const mongoose = require("mongoose");

var MsgSchema = mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true
        },
        senderName: {
            type: String,
            required: true
        },
        receiverId: {
            type: String,
            required: true
        },
        receiverName: {
            type: String,
            required: true
        },
        messages: {
            type: String,
            required: true
        }
    },
    { timestamps: true })

let UserData = mongoose.model("UserData", MsgSchema)
let UsersData = UserData
module.exports = UsersData

class ChatModel {

    addUser(userinfo, callback) {
        console.log();

        let chatuser = new UserData({
            "senderId": userinfo.senderId,
            "senderName": userinfo.senderName,
            "receiverId": userinfo.receiverId,
            "receiverName": userinfo.receiverName,
            "messages": userinfo.messages
        })
        console.log(chatuser);

        chatuser.save((err, data) => {
            if (err) {
                console.log(err);

                callback(err)
            } else {
                 callback(null, data)
            }
        })
    }

    // saveMsg(userinfo, callback) {
    //     UserData.findByIdAndUpdate({ "senderId": userinfo.senderId }, { "messages": userinfo.messages }, (err, data) => {
    //         if (err) {
    //             return callback({ message: "Something went wrong" });
    //         } else {
    //             return callback({ message: "message saved..", data: data })
    //         }
    //     })
    // }

    getSenderMsg(id, callback) {
        console.log("senderId--->62", id.senderId);
        let messages = []

        UserData.find({ $and: [{ "senderId": id.senderId, "receiverId": id.receiverId }] }, (err, data) => {
            if (err) {
                console.log("Error in model--->66", data);
                callback({ message: "Something went wrong" })
            } else {
                console.log("No Error in model--->69", data);
                messages.push(data);
                UserData.find({ $and: [{ "senderId": id.receiverId }, { "receiverId": id.senderId }] }, (err, data) => {
                    if (err) {
                        console.log(err);
                        callback({ message: "Error in model---->75" })

                    } else {
                        console.log(data);

                        console.log("No error in model--->78")
                        messages.push(data)
                        console.log(messages);
                        
                         callback(null, { message: " Your Chats", data: messages })
                    }
                })
            }
        })
    }
}

module.exports = ChatModel;