const bcrypt = require ("bcrypt");

let bCrypt = (userPassword) => {
    const saltRounds = 8;
    return bcrypt.hashSync(userPassword, saltRounds);
};

module.exports = bCrypt;