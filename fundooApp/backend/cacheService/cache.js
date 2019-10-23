var redis = require("redis");
var client = redis.createClient(process.env.REDIS_PORT);

client.on('error', function(err){
    console.log('Something went wrong ', err)
});

class Cache {
    
    notes(req,res,next){
        // const userName = req.body.userName;
        // console.log("cache---->10",userName);
        const keyValue = req.decoded._id+"notes" 
        console.log("cache---->14",keyValue)   
        client.get(keyValue, (err,data)=>{
            if(err){
                res.status(500).send(err)
            }else if(data !== null){
                console.log("cache middleware---->15",data);
    
                let response = {};
                response.message = "Got notes from cache..!";
                response.notes = JSON.parse(data);
                // response.notes =  JSON.parse(data.toString())
                // response.notes = data
                res.status(200).send(response)
            }else{
                next();
            }
        })
    }

    token(req,res,next){
        const keyValue = req.body.userName+'token'
        client.get(keyValue, (err,data) => {
            if(err){
                let response = {};
                response.status = false;
                response.message = "Error occured in cache..!";
                // responce.notes = JSON.parse(data);
                response.error =  err
                res.status(500).send(response)
            }else if(data !== null){
                console.log("cache middleware---->15",data);
                let response = {};
                response.status = true
                response.message = "Got token from cache..!";
                // responce.notes = JSON.parse(data);
                response.token =  data
                res.status(200).send(response)
            }else{
                next();
            }
        })
    }    

    // appendnote(req,res,next){
    //     const keyValue = req.decoded._id+"notes"
    //     client.get(keyValue,(err,data)=>{
    //         if(err){
    //             let response = {}
    //             response.status = false;
    //             response.message = "Error occured in cache..!";
    //             response.error = err
    //             res.status(500).send(response)
    //         }else if(data !== null){

    //         }
    //     })
    // }
}
 

module.exports = new Cache();