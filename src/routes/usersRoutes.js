const { Router } = require("express");
const router = Router();

const {
  SignupForm,
  SignUp,
  LoginForm,
  LogIn,
  LogOut,
} = require("../controllers/usersController");

router.get("/signup", SignupForm);
router.post("/signup", SignUp);
router.get("/login", LoginForm);
router.post("/login", LogIn);
router.get("/logout", LogOut);

module.exports = router;
