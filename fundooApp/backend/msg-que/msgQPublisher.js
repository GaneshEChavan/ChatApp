const amqp = require("amqplib/callback_api")
// const userFile = require("../service/user")
// const listen = userFile.emitter
// const eventEmmiter = require("events")
const listen = require("../service/user")

// let eventEmmiter = new event.EventEmitter()
class MessageQ {
    // class producer extends eventEmmiter {

    producer() {
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

    //     consumer() {
    //         amqp.connect("amqp://localhost", function (error0, connection) {
    //             if (error0) {
    //                 throw error0
    //             }
    //             connection.createChannel(function (error1, channel) {
    //                 if (error1) {
    //                     throw error1
    //                 }
    //                 var queue = "node_queue"

    //                 channel.assertQueue(queue, {
    //                     durable: true
    //                 })
    //                 // channel.prefech(1)

    //                 console.log("waiting for message in que", queue)
    //                 channel.consume(queue, function (msg) {
    //                     console.log("Received msg ....abe work ho bhai", JSON.parse(msg.content.toString('utf8')));

    //                     setTimeout(function () {
    //                         channel.ack(msg);
    //                     }, 100);
    //                 })
    //             })
    //         })
    //     }
    // }

    // module.exports = new producer()

    //  const produce = new producer()
    //  produce.on("connection",()=>{
    //      produce.producer()
    //  })
    // consumer() {

    //     amqp.connect("amqp://localhost", function (error0, connection) {
    //         if (error0) {
    //             throw error0
    //         }
    //         connection.createChannel(function (error1, channel) {
    //             if (error1) {
    //                 throw error1
    //             }
    //             var queue = "node_queue"

    //             channel.assertQueue(queue, {
    //                 durable: true
    //             })
    //             channel.prefech(1)

    //             console.log("waiting for message in que", queue)
    //             channel.consume(queue, function (msg) {
    //                 console.log("Received msg", JSON.parse(msg.content.toString('utf8')));

    //                 setTimeout(function () {
    //                     channel.ack(msg);
    //                 }, 1000);
    //             })
    //         })
    //     })

    // }
}

module.exports = new MessageQ()