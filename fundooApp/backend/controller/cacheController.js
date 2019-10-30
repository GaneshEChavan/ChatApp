/******************************************************************************
 *  @Purpose        : To create controller to handle the data from redis-cache. 
 *  @file           : controller/cacheController.js        
 *  @author         : CHAVAN G E
 *  @version        : v0.1
 *  @since          : 21-10-2019
 ******************************************************************************/
const client = require("../service/cacheService")

class Cache {
    /**
     * @description : It handles the all notes of requested user
     * @param {*request from frontend} req 
     * @param {*response from backend} res 
     * @param {*next function to call} next
     */
    notes(req, res, next) {
        const keyValue = req.decoded._id + "notes"
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
        const keyValue = req.body.userName + 'token'
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
            response.status = false;
            response.message = "Error occured in cache..!";
            response.error = err
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
        const keyValue = req.decoded._id + redis + "true"
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
            response.status = false;
            response.message = "Error occured in cache..!";
            response.error = err
            res.status(500).send(response)
        })
    }
}


module.exports = new Cache();