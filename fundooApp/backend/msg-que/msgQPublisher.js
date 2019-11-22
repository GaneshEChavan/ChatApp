const amqp = require("amqplib/callback_api")
const listen = require("../service/user")
class MessageQ {
    producer() {
        // console.log("listener------>",listen.);
        
        listen.emitter.on("connection", (data) => {
            amqp.connect("amqp://localhost", (error, connection) => {
                if (error) {
                    throw error
                } else {
                    console.log("rabbit mq connection is ON");
                    connection.createChannel((error1, channel) => {
                        if (error1) {
                            throw error1;
                        }
                        let queue = 'node_queue';
                        let msg = {
                            email:data.email,
                            template:data.template
                        }

                        channel.assertQueue(queue, {
                            durable: true
                        });
                        channel.sendToQueue(queue, new Buffer.from(JSON.stringify(msg)), {
                            persistent: true
                        });
                        console.log("Sent messgae", msg)

                    });
                    setTimeout(function () {
                        connection.close();
                        process.exit(0)
                    }, 1000);
                }
            })
        }
        )
    }
}

module.exports = new MessageQ()