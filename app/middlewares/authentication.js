const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../user/user.model');

module.exports = () => {
  passport.use('local', new passportLocal.Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user || password !== user.password) {
        return done(null, false, { message: 'Credenciais inválidas.' });
      }

      return done(null, user.toJSON());
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  return passport.initialize();
};
