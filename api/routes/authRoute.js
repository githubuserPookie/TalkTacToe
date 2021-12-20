const router = require("express").Router();

const authController = require("../controllers/authControllers.js");

router.get("/isLoggedIn", authController.checkLogin);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

module.exports = router;