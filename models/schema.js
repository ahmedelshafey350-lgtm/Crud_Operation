
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    duration: {
      type: String,
      required: true
    },

    language: {
      type: String,
      default: "English"
    },

    instructor: {
      name: {
        type: String,
        required: true
      },
      experience: {
        type: String
      }
    },

    prerequisites: {
      type: [String],
      default: []
    },

    whatYouWillLearn: {
      type: [String],
      default: []
    },

    requirements: {
      type: [String],
      default: []
    },

    thumbnail: {
      type: String,
      default: ""
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
