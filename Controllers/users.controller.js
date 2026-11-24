const asyncWrraber = require("../Middlewares/asyncWrraber");
const users = require("../models/user.schema");
const bcrypt = require("bcrypt");
const AddError = require("../utils/errorHandler");
const httpError = require("../utils/httpmessagestatus");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const JWT = require("../utils/jwt");
const get_all_User = asyncWrraber(async (req, res, next) => {
  const getUsers = await users.find({}, { __v: false, password: false });
  res.status(200).json(getUsers);
});

const signUp = asyncWrraber(async (req, res, next) => {
    console.log(req.file, req.body)
  const { first_name, last_name, email, password , role ,avatar  } = req.body;

  const EmailFind = await users.findOne({ email });
  if (EmailFind) {
    return next(
      AddError.createError(409, httpError.FAIL, "Email already exists"),
    );
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await users.create({
    first_name,
    last_name,
    email,
    password: hashPassword,
    role,
    avatar : req.file.filename
  });
  newUser.token = JWT({ id: newUser._id, email: newUser.email , role : newUser.role });
  await newUser.save();
  res.status(201).json({
    status: httpError.SUCCES,
    data: {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
      avatar : newUser.avatar
    },
    token: newUser.token,
  });
});

const login = asyncWrraber(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(AddError.createError(400, httpError.FAIL, errors.array()));
  }

  const { email, password } = req.body;

  const emailUser = await users.findOne({ email });
  if (!emailUser) {
    return next(
      AddError.createError(401, httpError.FAIL, "Invalid email or password"),
    );
  }

  const isMatch = await bcrypt.compare(password, emailUser.password);
  if (!isMatch) {
    return next(
      AddError.createError(401, httpError.FAIL, "Invalid email or password"),
    );
  }

  let token = emailUser.token;

  try {
    jwt.verify(token, process.env.JWT_TOKEN); 
  } catch (err) {
    token = JWT({ id: emailUser._id, email: emailUser.email });
    emailUser.token = token;
    await emailUser.save();
  }

  res.status(200).json({
    status: httpError.SUCCES,
    message: "Logged in successfully",
    token,
  });
});

module.exports = {
  get_all_User,
  signUp,
  login,
};
