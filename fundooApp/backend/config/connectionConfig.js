const mongoose = require("mongoose");
const redis = require("redis")
const elasticsearch = require("elasticsearch");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

class Connections {
    dbConnection(env) {
        console.log("environment variables in dbconfig", env);

        mongoose.connect(`${env.mongod.dbPort}`, {
            /**
             * @description: DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, 
             *               and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
             *               pass option { useUnifiedTopology: true } and { useNewUrlParser: true } to the MongoClient constructor
             */
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose.connection.on("connected", function () {
            console.log("Configured -> Mongoose default connection is open to ", env.mongod.dbPort);
        });

        mongoose.connection.on("error", function (err) {
            console.log("Configured -> Mongoose default connection has occured " + err + " error");
            process.exit()
        });

        mongoose.connection.on("disconnected", function () {
            console.log("Configured -> Mongoose default connection is disconnected");
        });

    };

    redisConnection(env){
        const client = redis.createClient(env.redis.redis);
        client.on("connect", () => {
            console.log("Configured -> Redis client connected continue");
        });

        client.on("error", function (err) {
            console.log("Configured -> Something went wrong", err);
            process.exit()
        });
    }

    elasticConnection(env){
        let elasticClient = new elasticsearch.Client({
            host: env.elastic.elastPort,
            log: "error"
        });
        
        elasticClient.ping({
            requestTimeout: 30000
        }, (error) => {
            if (error) {
                console.log("Configured -> Elasticsearch cluster is down!");
                process.exit();
            } else {
                console.log("Configured -> Elasticsearch cluster is set ");
            }
        });
    }
    
}

module.exports = new Connections();