const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYWZjMjVlZGIyZjZmNTA1ODFkYjVhZSJ9LCJpYXQiOjE2NzI2NDU5NDEsImV4cCI6MTY3MjczMjM0MX0.B-fknl2rdcjxItWDY8KEliWY23oQm0SnFcbuosX_XwA";

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
};
