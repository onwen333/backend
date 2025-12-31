const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const header = req.headers.token || req.headers.authorization || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "The authentication", status: "ERROR" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const header = req.headers.token || req.headers.authorization || "";
  const token = header.split(" ")[1];
  const userId = req.params.id;
  if (!token) {
    return res
      .status(401)
      .json({ message: "The authentication", status: "ERROR" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(403).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
