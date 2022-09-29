const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  
  course_id: {type: Number},
  title: {type: String},
  heading: {type: String},
  para: {type: Array},
  fees: {type: Number}
});

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;
