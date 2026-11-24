const express = require("express");
const personal = require ("../utils/allowed.js") 
const route = express.Router();
const cors = require("cors");
var corsOptions = {
  origin: process.env.server_acsess,
  optionsSuccessStatus: 200 
}
const verifyToken = require("../Middlewares/Acsses.jwt");
const Allowed = require("../Middlewares/Admin_User.js");
const Course_Controller = require("../Controllers/courses.controller");
const MiddleWare = require("../Middlewares/middleware")
route
  .route("/")
  .get(verifyToken,cors(corsOptions),Course_Controller.Get_All_Courses)
  .post(verifyToken,Allowed(personal.ADMIN),MiddleWare(),Course_Controller.Add_New_Course);

route
  .route("/:id")
  .get(verifyToken,Course_Controller.Get_Single_Course)
  .patch(verifyToken,Allowed(personal.ADMIN),Course_Controller.Updata_Course)
  .delete(verifyToken,Allowed(personal.ADMIN),Course_Controller.Delete_Course);

module.exports = route;
