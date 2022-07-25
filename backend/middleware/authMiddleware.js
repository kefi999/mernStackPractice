const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check for auth headers in http
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //getting the token from the header

      token = req.headers.authorization.split(" ")[1];

      //verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from the token

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

//"bearer token" so we can spliut it
