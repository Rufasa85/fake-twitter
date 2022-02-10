const express = require("express");
const router = express.Router();
const { User, Tweet,Tag } = require("../models");

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  Tweet.findAll({
    include: [User,Tag]
  }).then(tweets => {
    console.log(tweets);
    const tweetRaw = tweets.map(tweet => tweet.get({ plain: true }));
    console.log("===========================");
    console.log(tweetRaw);
    res.render("home", { allTweets: tweetRaw });
  });
});

router.get("/user/:id", async (req, res) => {
  try {
    const userUnique = await User.findByPk(req.params.id, {
      include: [Tweet]
    });
    const user = userUnique.get({ plain: true });
    res.render("user", user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/tag/:id", async (req, res) => {
  try {
    const tagUnique = await Tag.findByPk(req.params.id, {
      include: [{
        model:Tweet,
        include:[User,Tag]
      }]
    });
    const tag = tagUnique.get({ plain: true });
    res.render("tag", tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/showsessions", (req, res) => {
  res.json(req.session);
});

router.get("/profile",(req, res) => {
    if(!req.session.user){
      return res.redirect("/login")
    }
    //if logged in, show your stuff
    //if not logged in, send a 403 Forbbiden erro
    User.findByPk(req.session.user.id, {
      include: [{
        model:Tweet,
        include:[Tag]
      }]
    }).then(userData => {
      Tag.findAll({
        order:[["name","asc"]]
      }).then(tags=>{
        const tagsRaw = tags.map(tag=>tag.get({plain:true}))
        const userRaw = userData.get({ plain: true });
        res.render("profile", {user:userRaw,tags:tagsRaw});
      })
    });
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
