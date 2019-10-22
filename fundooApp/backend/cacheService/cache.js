var redis = require("redis");
var client = redis.createClient(process.env.REDIS_PORT);

client.on('error', function(err){
    console.log('Something went wrong ', err)
});

function cache(req,res,next){
    // const userName = req.body.userName;
    // console.log("cache---->10",userName);
    const userName = "notes"    
    client.get(userName, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else if(data !== null){
            // console.log("cache middleware---->15",data);
            let responce = {};
            responce.message = "Got token from cache..!";
            responce.token = data;
            res.status(200).send(responce)
        }else{
            next();
        }
    })
}

module.exports = cache;