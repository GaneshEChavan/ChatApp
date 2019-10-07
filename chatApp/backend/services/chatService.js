const Model = require("../app/model/chatModel");

const chatModel = new Model();

class ChatService {
    chatMsgService(userData,callback){
        console.log("chatservice--->",userData)
        chatModel.addUser(userData,(err,data)=>{
            if(err){
                return callback(err)
            }else{
                return callback(null,data)
            }
        })
    }
    
    sendId(id , callback){
        console.log("service---->18",id);
        
        chatModel.getSenderMsg(id,(err,data)=>{
            if(err){
                return callback(err)
            }else{
                return callback(null,data)
            }
        })
    }
}

module.exports = ChatService;