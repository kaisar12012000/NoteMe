const { Router } = require("express");
const authController = require("../controllers/authController")
const limiter = require("../middlewares/rateLimiterMiddleware")

const router = Router();

router.post("/api/auth/login", limiter, authController.loginController)
router.post("/api/auth/signup", limiter, authController.signUpController)

module.exports = router