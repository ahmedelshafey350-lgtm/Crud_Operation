const express = require("express");
const {
  get_all_User,
  signUp,
  login,
} = require("../Controllers/users.controller");
const route = express.Router();
const cors = require("cors");

var corsOptions = {
  origin: process.env.server_acsess,
  optionsSuccessStatus: 200,
};
const verifyToken = require("../Middlewares/Acsses.jwt");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    crypto.randomBytes(5, (err, raw) => {
      if (err) return cb(err);
      cb(null, file.fieldname + "-" + raw.toString("hex") + path.extname(file.originalname));
    });
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;



const middleware = require("../Middlewares/user.middileWare");
route.route("/").get(verifyToken, get_all_User);
route.route("/sign").post(upload.single('avatar'),signUp);
route.route("/login").post(middleware(), cors(corsOptions), login);

module.exports = route;
