const uuid = require('uuid');
const passport = require('passport');
const User = require('./user.model');

// POST /users
exports.createNew = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });

    await user.save();

    res.redirect('/courses');
  } catch (err) {
    next(err);
  }
};

// GET /users/login
exports.renderLoginView = async (req, res, next) => {
  try {
    res.render('login', { user: req.user || null });
  } catch (err) {
    next(err);
  }
};

// POST /users/signin
exports.signIn = passport.authenticate('local', {
  successRedirect: '/courses',
  failureRedirect: '/users/login',
});

// POST /users/signup
exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    res.redirect(307, '/users/signin');
  } catch (err) {
    next(err);
  }
};

// POST /users/signout
exports.signOut = async (req, res, next) => {
  try {
    req.logout();
    res.redirect('/courses');
  } catch (err) {
    next(err);
  }
};
