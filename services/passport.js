const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{done(null,user);});
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
}, async (accessToken, refreshToken, profile, done) => {
    const userId = profile.id;
    
    const existingUser = await User.findOne({googleId:userId});
    if(existingUser){
        done(null,existingUser);
    }else{
        const newUser = new User({
            googleId:profile.id
        });
        const usr = await newUser.save();
        done(null,usr);
    }
}));

module.exports = {passport}