const keys = require('../config/keys');
const {requireLogin} = require('../middlewares/requireLogin');

const stripe = require('stripe')(keys.stripeSecretkey);

module.exports = app =>{
    app.post('/api/stripe',requireLogin,async(req,res)=>{
        const userCredit = 5;
        const charge = await stripe.charges.create({
           amount:userCredit*100,
           currency:'usd',
           description:'$5 for 5 Credits',
           source:req.body.id 
        });
        req.user.credits += userCredit;
        const user = await req.user.save();
        res.send(user);
    });
}