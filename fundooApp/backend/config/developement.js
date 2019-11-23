module.exports = {
    // developement:{
        mongod:{
            dbPort: process.env.MONGO,
        },
        redis:{
            redisPort:process.env.REDIS_PORT
        },
        elastic:{
            elastPort:process.env.ELASTIC_PORT
        }
    // }
}