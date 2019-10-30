/******************************************************************************
 *  @Purpose        : To create service to provide the data from redis-cache. 
 *  @file           : service/cacheService.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 21-10-2019
 ******************************************************************************/

/**
 * @description : required redis to create new client
 */
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

class Get {

    getOperator(keyValue) {
        return new Promise((res, rej) => {
            /**
             * @description : client.get method provides data saved for key
             */
            client.get(keyValue, (err, data) => {
                if (err) {
                    rej(err)
                } else {
                    res(data)
                }
            })
        })
    }
}

module.exports = new Get();