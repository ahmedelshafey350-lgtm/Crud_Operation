const { validationResult } = require("express-validator");

const Course = require("../models/schema");

const httpMessage = require("../utils/httpmessagestatus");

const asyncWrraper = require("../Middlewares/asyncWrraber");
const AppError = require("../utils/errorHandler");
const Get_All_Courses = async (req, res) => {
  const Page2 = Number(req.query.page) || 1;
  const skip2 = Number((Page2 - 1) * 10);

  try {
    const courses = await Course.find(
      {},
      {
        __v: false,
        duration: false,
        language: false,
        prerequisites: false,
        whatYouWillLearn: false,
        requirements: false,
        instructor: false,
        description: false,
        createdAt: false,
        updatedAt: false,
      },
    )
      .limit(10)
      .skip(skip2);

    res.status(200).json({ status: httpMessage.SUCCES, data: { courses } });
  } catch (error) {
    res.status(500).json({
      Status: httpMessage.ERROR,
      Error: error.message,
    });
  }
};

const Get_Single_Course = asyncWrraper(async (req, res, next) => {
  const course = await Course.findById(req.params.id, { __v: false });

  if (!course) {
    const error = AppError.createError(500, httpMessage.FAIL, null);
    return next(error);
  }
  return res.json({ status: httpMessage.SUCCES, data: { course } });
});

const Add_New_Course = asyncWrraper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(AppError.createError(401, httpMessage.ERROR, { errors }));
  }

  const newCourses = await Course.insertMany(req.body);

  res.status(201).json({ Status: httpMessage.SUCCES, data: { newCourses } });
});

const Updata_Course = asyncWrraper(async (req, res, next) => {
  const SingleCourse = await Course.updateOne(
    { _id: req.params.id },
    { ...req.body },
  );

  if (!SingleCourse) {
    return next(AppError.createError(404, httpMessage.FAIL, null));
  }

  return res
    .status(205)
    .json({ Status: httpMessage.SUCCES, data: { SingleCourse } });
});

const Delete_Course =asyncWrraper(
  async (req, res) => {
     await Course.deleteOne({ _id: req.params.id });
    res.status(204).json({ status: "Succses", data: null });
});

module.exports = {
  Get_All_Courses,
  Get_Single_Course,
  Add_New_Course,
  Updata_Course,
  Delete_Course,
};
