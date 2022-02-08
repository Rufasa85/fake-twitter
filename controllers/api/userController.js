const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router();
const {User,Tweet} = require('../../models');

router.get('/',(req,res)=>{
    User.findAll({
        include:[Tweet]
    }).then(users=>{
        res.json(users)
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"wrong username/password buddy"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            req.session.user = {
                id:foundUser.id,
                email:foundUser.email,
                username:foundUser.username
            }
            return res.json(foundUser);
        } else {
            return res.status(401).json({msg:"wrong username/password buddy"})
        }
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
})

module.exports = router;