const router = require("express").Router();
const chatControllers = require("../controllers/chatControllers.js");

router.get("/:name", chatControllers.loadChatMessages);
router.post("/addMessage", chatControllers.addMessage);

module.exports = router;