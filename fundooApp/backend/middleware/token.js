const jwt = require("jsonwebtoken");
require('dotenv').config({ path: __dirname + '../.env' });

module.exports = {
    async token(payload) {
        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1 days" })
         return token
    }

}