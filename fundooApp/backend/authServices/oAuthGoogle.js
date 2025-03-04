const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},(accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
})
);