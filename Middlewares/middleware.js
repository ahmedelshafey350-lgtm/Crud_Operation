
const { body } = require("express-validator");

const MiddleWare = () => {
  return [
    body()
      .isArray({ min: 1 })
      .withMessage("Courses must be a non-empty array"),

    body("*.title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters"),

    body("*.description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),

    body("*.category")
      .trim()
      .notEmpty()
      .withMessage("Category is required"),

    body("*.level")
      .notEmpty()
      .withMessage("Level is required")
      .isIn(["Beginner", "Intermediate", "Advanced"])
      .withMessage("Invalid course level"),

    body("*.price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number")
      .toFloat(),

    body("*.duration")
      .trim()
      .notEmpty()
      .withMessage("Duration is required"),

    body("*.language")
      .optional()
      .isString()
      .withMessage("Language must be a string"),

    body("*.instructor")
      .isObject()
      .withMessage("Instructor must be an object"),

    body("*.instructor.name")
      .trim()
      .notEmpty()
      .withMessage("Instructor name is required"),

    body("*.instructor.experience")
      .optional()
      .isString()
      .withMessage("Instructor experience must be a string"),

    body("*.prerequisites")
      .optional()
      .isArray()
      .withMessage("Prerequisites must be an array"),

    body("*.prerequisites.*")
      .isString()
      .withMessage("Each prerequisite must be a string"),

    body("*.whatYouWillLearn")
      .optional()
      .isArray()
      .withMessage("WhatYouWillLearn must be an array"),

    body("*.whatYouWillLearn.*")
      .isString()
      .withMessage("Each learning item must be a string"),

    body("*.requirements")
      .optional()
      .isArray()
      .withMessage("Requirements must be an array"),

    body("*.requirements.*")
      .isString()
      .withMessage("Each requirement must be a string"),

    body("*.thumbnail")
      .optional()
      .isString()
      .withMessage("Thumbnail must be a string"),

    body("*.isPublished")
      .optional()
      .isBoolean()
      .withMessage("isPublished must be a boolean")
  ];
};

module.exports = MiddleWare;
