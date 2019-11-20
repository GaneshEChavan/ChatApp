const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost",(error,connection)=>{
if(error){
    throw error
}else{
    console.log("rabbit mq connection is ON");    
}
})