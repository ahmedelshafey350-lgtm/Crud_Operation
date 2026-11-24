var jwt = require("jsonwebtoken");



const JWTTaken = (payload) => {
  const token = jwt.sign(
    payload, 
    process.env.JWT_TOKEN, 
    { expiresIn: "1d" }, 
  );
  return token;
};

module.exports = JWTTaken;
