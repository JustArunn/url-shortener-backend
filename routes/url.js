const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { createUrl, redirectUrl, getUrls } = require("../controllers/url");

//public route
router.get("/:shortId", redirectUrl);

//protected routes
router.post("/createUrl", auth, createUrl);
router.post("/v1/getUrls", auth, getUrls);

module.exports = router;
