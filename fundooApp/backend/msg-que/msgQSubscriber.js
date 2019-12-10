const amqp = require("amqplib/callback_api")
const mailer = require("../middleware/mailer")

class Consumer {
    sendEmail() {
        
        amqp.connect('amqp://rabbitmq', (error0, connection) => {
            console.log("Subscriber connection successful");
        if (error0) {
              throw error0;
            }
            connection.createChannel((error1, channel) => {
              if (error1) {
                throw error1;
              }
              var queue = 'node_queue';
              channel.assertQueue(queue, {
                durable: true
              });
              channel.prefetch(1);
              
              console.log("Waiting for messages in %s", queue);
              channel.consume(queue,async (msg) => {
                let emailInfo = JSON.parse(msg.content.toString('utf8'));
                console.log("email info in consumer",emailInfo);
                
                await mailer.nodeMailer(emailInfo.email,emailInfo.template)
                
                setTimeout(() => {
                  channel.ack(msg);
                }, 1000);
              });
            });
          });

    }
}
module.exports = new Consumer
