const express = require("express");
const { userRegister, login, chechUserWithUsername } = require("../controllers/auth");
const {checkAuth} = require("../middlewares/checkAuth");
const router = express.Router();
const User = require("../models/User");
const {upload} = require("../middlewares/libraries/articleImageUpload");

router.get("/registerPage", async(req,res,next) => res.render("register"));
router.post("/register", userRegister);
router.post("/register2/:username", chechUserWithUsername,upload.single("inputImage"));
router.get("/loginPage", (req,res) => res.render("login"));
router.get("/login",login);
router.get("/edit", checkAuth, async(req,res) => res.send("hello"));

module.exports = router; 