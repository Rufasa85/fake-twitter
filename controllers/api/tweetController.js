const express = require("express");
const router = express.Router();
const { User, Tweet, Tag } = require("../../models");

router.get("/", (req, res) => {
  Tweet.findAll({
    include: [Tag]
  })
    .then(dbTweets => {
      res.json(dbTweets);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "uh oh!", err });
    });
});
router.get("/:id", (req, res) => {
  Tweet.findByPk(req.params.id,{
    include: [Tag]
  })
    .then(dbTweets => {
      res.json(dbTweets);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "uh oh!", err });
    });
});

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

router.post("/addtag/:tweetid", (req, res) => {
  Tweet.findByPk(req.params.tweetid).then(foundTweet => {
    if (!foundTweet) {
      return res.status(404).json({ msg: "no such tweet!" });
    } else {
      Tag.findOne({
        where: {
          name: req.body.tagname
        }
      }).then(foundTag => {
        if (!foundTag) {
          Tag.create({name:req.body.tagname}).then(newTag=>{
            foundTweet.addTag(newTag);
            return res.json(foundTweet);
          })
        } else {
          foundTweet.addTag(foundTag);
          res.json(foundTweet);
        }
      });
    }
  });
});

router.delete("/removeTag/:tweetid/:tagid", (req, res) => {
  Tweet.findByPk(req.params.tweetid).then(foundTweet => {
    if (!foundTweet) {
      return res.status(404).json({ msg: "no such tweet!" });
    } else {
      foundTweet.removeTag(req.params.tagid);
      res.json(foundTweet);
    }
  });
});

module.exports = router;
