const express = require('express');
// const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const bcrypt = require("bcrypt")
var session = require('express-session')

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge:2*60*60*1000
     }
  }))

const {User,Tweet} = require("./models")


// app.use('/',allRoutes);
app.get('/',(req,res)=>{
    res.send("hello everyone!")
})
app.get('/api/users',(req,res)=>{
    User.findAll({
        include:[Tweet]
    }).then(users=>{
        res.json(users)
    })
})

app.post("/api/users/login",(req,res)=>{
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

app.get("/counter",(req,res)=>{
    if(req.session.count){
        req.session.count++
    } else {
        req.session.count=1
    }
    res.send("sessions updated");
})

app.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

app.get("/profile",(req,res)=>{
    //if logged in, show your stuff
    //if not logged in, send a 403 Forbbiden error
    if(req.session.user){
      res.send(`welcome to the club ${req.session.user.username}!`)
    } else {
        res.status(403).json({msg:"login first dood!"})
    }
})

app.post("/api/tweets",(req,res)=>{
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

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});