/******************************************************************************
 *  @Purpose        : To create controller to handle the data from redis-cache. 
 *  @file           : controller/cache.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 21-10-2019
 ******************************************************************************/
const client = require("../service/cache")

class Cache {
    /**
     * @description : It handles the all notes of requested user
     * @param {*request from frontend} req 
     * @param {*response from redis-cache} res 
     * @param {*next function to call if no redis-cache found} next
     */
    notes(req, res, next) {
        const keyValue = req.decoded._id + process.env.NOTE
        console.log("cache---->14", keyValue)
        let response = {};
        client.getOperator(keyValue).then(data => {
            // if (err) {
            //     res.status(500).send(err)
            // } else 
            if (data !== null) {
                //     console.log("cache middleware---->15", data);

                response.status = true
                response.message = "Got notes from cache..!";
                // response.notes = JSON.parse(data);
                response.notes = JSON.parse(data.toString())
                res.status(200).send(response)
            } else {
                next();
            }
        }).catch(err => {
            response.status = false
            response.message = "Something went wrong..!";
            // response.notes = JSON.parse(data);
            response.error = err
            res.status(500).send(response)

        })
    }
    /**
     * @description : It handles the token for logged in user
     * @param {*request from frontend} req 
     * @param {*response from backend} res 
     * @param {*next function to call} next
     */
    token(req, res, next) {
        let response = {};
        const keyValue =  process.env.TOKEN + req.body.userName
        client.getOperator(keyValue).then(data => {
            if (data !== null) {
                let response = {};
                response.status = true
                response.message = "Got token from cache..!";
                // responce.notes = JSON.parse(data);
                response.token = data
                res.status(200).send(response)
            } else {
                next();
            }
        }).catch(err => {
            logger.error(err)
            response.status = false;
            response.message = "Error occured in cache..!";
            res.status(500).send(response)
        })
    }
    /**
     * @description : It handles the all requested list by user
     * @param {*request from frontend} req 
     * @param {*response from backend} res 
     * @param {*next function to call} next
     */
    list(req, res, next) {
        let redis = Object.keys(req.query)[0]
        const keyValue = req.decoded._id + redis + process.env.TRUE
        client.getOperator(keyValue).then(data => {
            if (data !== null) {
                let response = {};
                response.status = true
                response.message = "Got list from cache..!";
                // responce.notes = JSON.parse(data);
                response.list = JSON.parse(data.toString())
                res.status(200).send(response)
            } else {
                next();
            }
        }).catch(err => {
            logger.error(err)
            response.status = false;
            response.message = "Error occured in cache..!";
            res.status(500).send(response)
        })
    }
}


module.exports = new Cache();