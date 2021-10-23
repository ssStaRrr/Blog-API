const express = require("express");
const router = express.Router();
const {getAbout, home} = require("../controllers/home");

router.get("/", home);
router.get("/about", getAbout);

module.exports = router;
