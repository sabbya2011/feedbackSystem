const express = require('express');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const {passport} = require('./services/passport');
require('./db/mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(
    cookieSession({
        maxAge:keys.cookieSessionMaxAge,
        keys:[keys.cookieSessionKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Feedback server is up and running");
});