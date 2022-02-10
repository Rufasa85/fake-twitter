const express = require('express');
const router = express.Router();

const tweetRoutes = require("./tweetController.js")
router.use("/tweets",tweetRoutes)

const userRoutes = require("./userController.js")
router.use("/users",userRoutes)

const tagRoutes = require("./tagController.js")
router.use("/tags",tagRoutes)

module.exports = router;