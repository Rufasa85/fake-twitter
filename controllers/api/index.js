const express = require('express');
const router = express.Router();

const tweetRoutes = require("./tweetController.js")
router.use("/tweets",tweetRoutes)

const userRoutes = require("./userController.js")
router.use("/users",userRoutes)

module.exports = router;