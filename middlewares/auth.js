const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, email) => {
        if (err) {
          return res.status(402).json({
            message: err.message,
          });
        } else {
          req.email = email;
          next();
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error in auth MW " + err.message,
    });
  }
};

module.exports = { auth };
