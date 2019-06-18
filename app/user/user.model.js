const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  courses: [
    {
      id: String,
      name: String,
      registerDate: Date,
    },
  ],
});

userSchema.methods.equals = function equals(other) {
  return this.id === other.id;
};

userSchema.methods.enrollOnCourse = function enrollOnCourse(courseToEnroll) {
  if (this.courses.some(course => course.equals(courseToEnroll))) {
    throw new Error('User is already enrolled on this course.');
  }

  this.courses.push({
    id: courseToEnroll.id,
    name: courseToEnroll.name,
    registerDate: new Date(),
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
