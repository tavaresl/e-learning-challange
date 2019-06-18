const courseController = require('./course.controller');

module.exports = (router) => {
  router
    .route('/')
    .post(courseController.createNew)
    .get(courseController.renderCoursesList);

  router
    .route('/:id')
    .get(courseController.renderCoursePage);

  router
    .route('/:id/enrollment')
    .post(courseController.enrollUserOnCourse);

  return router;
};
