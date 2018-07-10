const requireCredits = (req,res,next)=>{
    
    if(req.user.credit<1){
        res.status(403).send({error:'Not Enough Credits'});
    }
    next();
}
module.exports = requireCredits;