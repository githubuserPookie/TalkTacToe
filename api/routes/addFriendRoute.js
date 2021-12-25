const router = require("express").Router();
const mongoose = require("mongoose");
const controllerAddFriend = require("../controllers/addFriendController.js");

router.post("/", controllerAddFriend.addFriend);

module.exports = router;