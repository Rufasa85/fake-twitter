const express = require("express");
const router = express.Router();
const { User, Tweet } = require("../models");
const withAuth = require("../utils/withAuth")

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  Tweet.findAll({
    include: [User]
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

router.get("/showsessions", (req, res) => {
  res.json(req.session);
});

router.get(
  "/profile",withAuth,(req, res) => {
    //if logged in, show your stuff
    //if not logged in, send a 403 Forbbiden erro
    User.findByPk(req.session.user.id, {
      include: [Tweet]
    }).then(userData => {
      const userRaw = userData.get({ plain: true });
      res.render("profile", userRaw);
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
