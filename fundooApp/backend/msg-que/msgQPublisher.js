const amqp = require("amqplib/callback_api")
const userFile = require("../service/user")
const listen = userFile.emitter

class MessageQ{
    producer() {
        amqp.connect("amqp://localhost", (error, connection) => {
            if (error) {
                throw error
            } else {
                console.log("rabbit mq connection is ON");
                    connection.createChannel((error1, channel) =>{
                        if (error1) {
                          throw error1;
                        } 
                        let queue = 'node_queue';
                    let msg = 'Test message';

                    channel.assertQueue(queue, {
                      durable: true
                    });
                    channel.sendToQueue(queue, Buffer.from(msg), {
                      persistent: true
                    });
                    console.log("Sent '%s'", msg)
                    listen.on("connection",this.consumer())
                  });
                  setTimeout(function() {
                    connection.close();
                    process.exit(0)
                  }, 500);   
            }
        })
    }

    consumer() {
       
        amqp.connect("amqp://localhost", function (error0, connection) {
            if (error0) {
                throw error0
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1
                }
                var queue = node_queue

                channel.assertQueue(queue, {
                    durable: true
                })
                channel.prefech(1)

                console.log("waiting for message in que", queue)
                channel.consume(queue, function (msg) {
                    console.log("Received msg", msg);

                    setTimeout(function () {
                        channel.ack(msg);
                    }, 1000);
                })
            })
        })
        
    }
}

module.exports = new MessageQ()