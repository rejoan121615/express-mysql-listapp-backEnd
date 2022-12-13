const { Router } = require("express");
const { CreateUser, LogInUser } = require("../controller/UserController");

const router = Router();

router.post("/log-in", LogInUser);


router.post("/sign-up", CreateUser);

module.exports = router;
