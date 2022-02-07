const express = require('express');
// const allRoutes = require('./controllers');
const sequelize = require('./config/connection');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {User,Tweet} = require("./models")


// app.use('/',allRoutes);
app.get('/',(req,res)=>{
    res.send("hello everyone!")
})
app.get('/api/users',(req,res)=>{
    User.findAll().then(users=>{
        res.json(users)
    })
})

sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});