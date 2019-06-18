const userController = require('./user.controller');

module.exports = (router) => {
  router
    .route('/')
    .post(userController.createNew);

  router
    .route('/login')
    .get(userController.renderLoginView);

  router
    .route('/signin')
    .post(userController.signIn);

  router
    .route('/signup')
    .post(userController.signUp);

  router
    .route('/signout')
    .post(userController.signOut);

  return router;
};
