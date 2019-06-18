const uuid = require('uuid/v4');
const Course = require('./course.model');
const User = require('../user/user.model');

// POST /courses
exports.createNew = async (req, res, next) => {
  try {
    const { name, description, duration, rating } = req.body;
    const course = new Course({
      id: uuid(),
      name,
      description,
      duration,
      rating,
    });

    await course.save();

    return res.status(201).send({
      id: course.id,
      name: course.name,
      description: course.description,
      duration: course.duration,
      rating: course.rating,
    });
  } catch (err) {
    return next(err);
  }
};

// GET /courses
exports.renderCoursesList = async (req, res, next) => {
  try {
    const courses = await Course.find();
    const user = await User.findOne({ id: req.user && req.user.id });
    return res.render('courses', { user: user || null, courses });
  } catch (err) {
    return next(err);
  }
};

// GET /courses/:id
exports.renderCoursePage = async (req, res, next) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    const user = await User.findOne({ id: req.user && req.user.id });

    if (!course) return res.redirect('/courses');

    return res.render('course', { user: user || null, course });
  } catch (err) {
    return next(err);
  }
};

// POST /courses/:id/enrollment
exports.enrollUserOnCourse = async (req, res, next) => {
  try {
    if (!req.user) return res.redirect('/users/login');

    const course = await Course.findOne({ id: req.params.id });
    const user = await User.findOne({ id: req.user.id });

    if (!course) return res.redirect('/courses');

    user.enrollOnCourse(course);

    await user.save();

    return res.redirect(`/courses/${req.params.id}`);
  } catch (err) {
    return next(err);
  }
};
