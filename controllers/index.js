const express = require('express');
const router = express.Router();

const apiRoutes = require("./api")
router.use("/api",apiRoutes)

router.get('/',(req,res)=>{
    res.send("hello everyone!")
})

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

router.get("/profile",(req,res)=>{
    //if logged in, show your stuff
    //if not logged in, send a 403 Forbbiden error
    if(req.session.user){
      res.send(`welcome to the club ${req.session.user.username}!`)
    } else {
        res.status(403).json({msg:"login first dood!"})
    }
})


module.exports = router;