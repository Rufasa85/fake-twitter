const express = require('express');
const router = express.Router();
const {Tag,Tweet} = require('../../models');

router.get("/", (req, res) => {
    Tag.findAll({
      include:[Tweet]
    }).then(dbTags=>{
      res.json(dbTags)
    }).catch(err=>{
      console.log(err);
      res.status(500).json({msg:"uh oh!",err})
    })
  });
  

module.exports = router;