const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const httpError = require("../utils/httpmessagestatus");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
       errorHandler.createError(401, httpError.FAIL, "Token is required"),
    );
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = await jwt.verify(token, process.env.JWT_TOKEN);
    req.Role = decode;
    next();
  } catch (err) {
    const msg =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return next( errorHandler.createError(401, httpError.FAIL, msg));
  }
};

module.exports = verifyToken;
