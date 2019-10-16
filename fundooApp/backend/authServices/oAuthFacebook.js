const passport = require("passport");
const FacebookStrategy = require("passport-facebook-token")

passport.use("facebookToken",new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile);
        done(null, profile)
    }))