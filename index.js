const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars")
const moment = require("moment")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

const hbs = exphbs.create({
    helpers: {
        formatDate:date=>{
            console.log("hello")
            console.log(date)
            return moment(date).format(" [on] MM/DD/YYYY [at] hh:mm a")
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge:2*60*60*1000
     },
     store: new SequelizeStore({
        db: sequelize,
      }),
  }))

app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});


