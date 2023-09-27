const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { createUrl, redirectUrl } = require("../controllers/url");

//public route
router.get("/:shortId", redirectUrl);

//protected routes
router.post("/createUrl", auth, createUrl);

module.exports = router;
