const jwt = require("jsonwebtoken");
require('dotenv').config({path: __dirname+'../env'});

module.exports = {
    token(payload) {
        return token = jwt.sign(payload , process.env.SECRET_KEY , { expiresIn: "1 days" })
        
    }

}