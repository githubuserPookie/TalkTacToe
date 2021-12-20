const router = require("express").Router();

const authController = require("../controllers/authControllers.js");

router.get("/isLoggedIn", authController.checkLogin);

module.exports = router;