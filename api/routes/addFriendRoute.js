const router = require("express").Router();
const mongoose = require("mongoose");
const controllerAddFriend = require("../controllers/addFriendController.js");


router.get("/:username", controllerAddFriend.addFriend);

module.exports = router;