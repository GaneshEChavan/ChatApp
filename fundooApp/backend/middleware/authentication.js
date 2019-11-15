const jwt = require("jsonwebtoken");
var redis = require("redis");
const util = require("util")
var client = redis.createClient();
var async = require("async");

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

require('dotenv').config({ path: __dirname + '../.env' });

const auth = (req, res, next) => {
    const token = req.header("token")
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

            let promise = util.promisify(client.HGET).bind(client)

            async function callStat() {
                const redisValue = await promise(decoded.userName, process.env.TOKEN);

                if (redisValue == token) {
                    req.decoded = decoded;
                    console.log("Authentication Successful...!")
                    next();
                }
                else {
                    return res.status(401).json(
                        {
                            success: false,
                            message: 'Authentication Failed...!.'
                        });
                }
                return decoded;
            }
            callStat()
        })
    }
}

module.exports = auth



    // async.parallel([
        //     function(callback) {
        //         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        //             client.get(`${process.env.TOKEN}${decoded.userName}`, (err, data) => {
        //                 if (err) {
        //                     return err;
        //                 } else {
        //                     callback(null, data)
        //                 }
        //             })
        //         })
        //     }
        // ], function (err, results) {
        //     console.log("dataaaaa", results);
        // });