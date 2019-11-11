const jwt = require("jsonwebtoken");
var redis = require("redis");
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

require('dotenv').config({ path: __dirname + '../.env' });

const auth = (req, res, next) => {
    // console.log("auth--->09", client.GET("tokenbhushanranjane93@gmail.com"));
   
    const token = req.header("token")
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // console.log("auth--->15",`${process.env.TOKEN}${decoded.userName}`);
            // let key = `${process.env.TOKEN}${decoded.userName}`
            // console.log(key);
            // let varia = client.get(key)
            // console.log("auth--->16", varia);
            // console.log("---------------->17", typeof(token));
            if (err) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Unauthorised User..',
                        error: err
                    });
            } 
            else if (client.get(`${process.env.TOKEN}${decoded.userName}`) == token) {
                // console.log("auth--->23", client.get(`${process.env.TOKEN}${decoded.userName}`));
                // console.log("---------------->24", token);

                req.decoded = decoded;
                console.log("Authentication Successful...!")
                next();
            }
            else {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'token is expired.'
                    });
            }
            return decoded;
        });
    }
    else {
        return res.status(401).json({
            success: false,
            message: 'No token found in header..Unauthorised User.'
        });
    }
};

module.exports = auth;