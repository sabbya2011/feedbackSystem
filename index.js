const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const {passport} = require('./services/passport');
require('./db/mongoose');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge:keys.cookieSessionMaxAge,
        keys:[keys.cookieSessionKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    const path = require('path');

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Feedback server is up and running");
});