const express = require('express');

var app = express();

app.get('/',(req,res)=>{
    res.send({ping:'server is ready'});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Feedback server is up and running");
});