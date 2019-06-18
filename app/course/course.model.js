const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  duration: Number,
  rating: Number,
});

courseSchema.methods.equals = function equals(other) {
  return this.id === other.id;
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
