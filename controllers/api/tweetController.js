const express = require('express');
const router = express.Router();
const {User,Tweet} = require('../../models');

router.post("/",(req,res)=>{
    try{

        if(req.session.user){
            Tweet.create({
                body:req.body.body,
                UserId:req.session.user.id
            }).then(newTweet=>{
                res.json(newTweet)
            })
        } else {
            res.status(403).json({msg:"login first dood!"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }
})

module.exports = router;