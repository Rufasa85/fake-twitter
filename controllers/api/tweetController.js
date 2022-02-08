const express = require("express");
const router = express.Router();
const { User, Tweet } = require("../../models");

router.post("/", (req, res) => {
  if (req.session.user) {
    try {
      Tweet.create({
        body: req.body.body,
        UserId: req.session.user.id
      }).then(newTweet => {
        res.json(newTweet);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  } else {
    res.status(403).json({ msg: "login first dood!" });
  }
});

module.exports = router;
