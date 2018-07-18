const _ = require('lodash');
const Path = require('path-parser').default;
const {URL} = require('url');

const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


module.exports = app => {

    app.get('/api/surveys',requireLogin,async (req,res)=>{
        let surveys = await Survey.find({
            _user:req.user.id
        }).select({recipients:0});
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send('Thanks for voting');
    });
    app.post('/api/surveys/webhooks',(req,res)=>{
        
        const events = _.map(req.body,({email,url})=>{
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if(match){
                return {
                    email,
                    surveyId:match.surveyId,
                    choice:match.choice
                }
            }
            
        });
        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId');
        
        uniqueEvents.forEach(el=>{
            Survey.updateOne({
                _id:el.surveyId,
                recipients:{
                    $elemMatch:{
                        email:el.email,responded:false
                    }
                }
            },{
                $inc: {[el.choice]:1},
                $set:{
                    'recipients.$.responded':true
                },
                lastResponded: new Date()
            }).exec();
        })
        res.send({});
    });

    app.post('/api/surveys',requireLogin,requireCredits,async (req,res)=>{
        const {title,subject,body,recipients} = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(',').map(email=> { return {email:email.trim()} } ),
            _user:req.user.id,
            dateSent:Date.now()
        });
        const mailer = new Mailer(survey,surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        }
        catch(e){
            res.status(422).send(e);
        }
        
    });
}