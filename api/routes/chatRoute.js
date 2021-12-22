const router = require("express").Router();
const chatControllers = require("../controllers/chatControllers.js");

router.get("/:name", chatControllers.loadChatMessages);

module.exports = router;