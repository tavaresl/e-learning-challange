const mongoose = require('mongoose');

let connection = null;

module.exports = () => async (req, res, next) => {
  try {
    if (connection) {
      return next();
    }

    const connectionUri = process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017/elearning';

    connection = await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};
