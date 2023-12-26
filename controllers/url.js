const shortId = require("shortid");
const Url = require("../models/url");
const User = require("../models/user");

const createUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(401).json({
        message: "URL is required",
      });
    }
    const exUrl = await Url.findOne({ url });
    if (exUrl) {
      const { email } = req.email;
      await User.findOneAndUpdate(
        { email },
        { $push: { urls: exUrl._id } },
        { new: true }
      );
      return res.status(200).json({
        message: "Short URL created",
      });
    } else {
      const shortID = shortId.generate();
      const shortUrl = await Url.create({ shortId: shortID, redirectUrl: url });

      const { email } = req.email;
      await User.findOneAndUpdate(
        { email },
        { $push: { urls: shortUrl._id } },
        { new: true }
      );
      return res.status(200).json({
        message: "ShortUrl created",
        shortUrl: `${process.env.BASE_URL}/url/${shortID}`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUrls = async (req, res) => {
  try {
    const { email } = req.email;
    const exUser = await User.findOne({ email }).populate("urls").exec();
    if (exUser) {
      return res.status(200).json({
        success: true,
        urls: exUser.urls,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "You haven't created any URL",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went wrong while fetching urls",
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res.status(401).json({
        message: "Invalid URL",
      });
    } else {
      const shortDoc = await Url.findOne({ shortId });
      if (!shortDoc) {
        return res.status(402).json({
          message: "URL not found",
        });
      } else {
        return res.redirect(shortDoc.redirectUrl);
      }
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "someting went wrong in redirect URL route",
    });
  }
};

module.exports = {
  createUrl,
  redirectUrl,
  getUrls,
};
