const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("../config/keys");
const {User} = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{done(null,user);});
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},(accessToken, refreshToken, profile, done) => {
    const userId = profile.id;
    User.findOne({googleId:userId}).then(
        (existingUser)=>{
            if(!existingUser){
                const newUser = new User({
                    googleId:profile.id
                });
                newUser.save().then(usr=>done(null,usr));
            }else{
                done(null,existingUser);
            }
        }
    )
    
}));

module.exports = {passport}