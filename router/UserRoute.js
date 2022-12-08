const { Router } = require("express");
const { CreateUser } = require("../controller/UserController");

const router = Router();

router.get("/login", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

router.get("/sign-up", (req, res, next) => {});

router.post("/sign-up", CreateUser);

module.exports = router;
