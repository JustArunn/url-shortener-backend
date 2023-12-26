const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    } else {
      const newUser = User({ name, email, password });
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password is required",
      });
    }
    const exUser = await User.findOne({ email, password })
      .populate("urls")
      .exec();
    if (!exUser) {
      return res.status(401).json({
        message: "User doesnot exist",
      });
    } else {
      //JWT
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "20h",
      });
      return res
        .setHeader("Authorization", "Bearer " + token)
        .status(200)
        .json({
          message: "User loggedIn",
          success: true,
          token,
          exUser
        });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
