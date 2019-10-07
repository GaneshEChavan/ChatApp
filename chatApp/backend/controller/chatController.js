const service = require("../services/chatService");

let chatService = new service();

class chatControl {
    chatRegister(req,callback){
        // console.log("chatservice--->7",req)
        var userinfo = {
            senderId : req.senderId,
            senderName : req.senderName,
            receiverId : req.receiverId,
            receiverName : req.receiverName,
            messages : req.messages
        }
        chatService.chatMsgService(userinfo,(err,data)=>{
            if(err){
                callback(err)
            }else{
                callback(null,data);
                
            }
        })
    }

    getMessages(req,res){
        console.log("controller--->25",req.body);
        var sender = {
            senderId : req.body.senderId,
            receiverId:req.body.receiverId
        }
        chatService.sendId(sender,(err,data)=>{
            if(err){
                return res.status(400).send(err)
            }else{
                return res.status(200).send(data)
            }
        })
    }
}

module.exports = chatControl;