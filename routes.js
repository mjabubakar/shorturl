const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("./middleware/isAuth");
const { login, register } = require("./controllers/user");
const { allUrls, redirect, add } = require("./controllers/admin");

router.post("/add", isAuth, add);

router.post("/login", login);

router.post("/register", [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 })
], register);

router.get("/allurls", isAuth, allUrls);

router.get("/:customUrl", redirect);

module.exports = router;