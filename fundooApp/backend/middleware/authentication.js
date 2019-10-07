const jwt = require("jsonwebtoken");

require('dotenv').config({ path: __dirname + '../.env' });

const auth = (req, res, next) => {

    const token = req.header("token")
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Unauthorised User..'
                    });
            }
            else {
                console.log("auth--->18",decoded);
                
                req.decoded = decoded;
                console.log("Authentication Successful...!")
                next();
            }
            return decoded;
        });
    }
    else {
        return res.status(401).json(
            {
                success: false,
                message: 'No token found in header..Unauthorised User.'
            });
    }
};





module.exports = auth;