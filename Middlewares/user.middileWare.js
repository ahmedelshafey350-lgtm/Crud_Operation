const { body } = require("express-validator");

const MiddleWare = () => {
    return [
  body("email").notEmpty().isLength({ min: 5 }),
  body("password").notEmpty().isLength({ min: 5 }),
];
}


module.exports = MiddleWare;
