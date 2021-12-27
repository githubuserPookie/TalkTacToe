const router = require("express").Router();
const respondInviteControllers = require("../controllers/respondInviteControllers.js");

router.post("/", respondInviteControllers.respondToInvite);

module.exports = router;