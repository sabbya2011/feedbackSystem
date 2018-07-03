const express = require('express');
const passport = require('passport');

module.exports = app =>{
    app.get('/',(req,res)=>{
        res.send({ping:'server is ready'});
    });
    
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));
    
    app.get('/auth/google/callback',passport.authenticate('google'));    

    app.get('/users/current_user',(req,res)=>{
        res.send(req.user);
    });

    app.get('/users/logout',(req,res)=>{
        req.logout();
        res.send('User is logged out');
    });
}