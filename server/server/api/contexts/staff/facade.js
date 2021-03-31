const jwt = require('jsonwebtoken');
const error = require('../../../common/error');
const { default: l } = require('../../../common/logger');
const { User } = require('../../../database');

const TOKEN_EXPIRES = 7 * 86400; // 7 day in seconds

module.exports = {
  async register(req, res, next) {
    l.info(req.body);
    if (!req.body.user)
      return next(new error.BadRequest('User must be provided'));
    if (!req.body.user.password)
      return next(new error.BadRequest('Password must be provided'));
    if (req.body.user.password.length < 4) {
      return next(
        new error.BadRequest('Password should be at least 10 characters long')
      );
    }

    // get a sanitized version of the input
    const userModel = User.sanitize(req.body.user);
    userModel.state = 'ACTIVE';
    // create the password hash
    User.generateHash(req.body.user.password)
      .then((hash) => {
        userModel.hash = hash;
        // add the user to the DB
        return User.create(userModel);
      })
      .then((user) => {
        // responsd with the newly created user
        res.json({ error: null, user: user.getPublicProfile() });
      })
      .catch(next);
  },
  async login(req, res, next) {
    if (!req.body.email || req.body.email.length < 1)
      return next(new error.BadRequest('Email must be provided'));

    if (!req.body.password || req.body.password.length < 1)
      return next(new error.BadRequest('Password must be provided'));

    User.findByEmail(req.body.email.toLowerCase())
      .then((user) => {
        if (!user) throw new error.UserError('Invalid email or password');
        if (user.isPending()) {
          throw new error.Unauthorized(
            'Please activate your account. Check your email for an activation email'
          );
        }
        if (user.isBlocked())
          throw new error.Forbidden('Your account has been blocked');

        return user
          .verifyPassword(req.body.password)
          .then((verified) => {
            if (!verified)
              throw new error.UserError('Invalid email or password');
          })
          .then(
            () =>
              new Promise((resolve, reject) => {
                // create a token with the user's ID and privilege level
                jwt.sign(
                  {
                    uuid: user.getDataValue('uuid'),
                    admin: user.isAdmin(),
                  },
                  process.env.SESSION_SECRET,
                  { expiresIn: TOKEN_EXPIRES },
                  (err, token) => (err ? reject(err) : resolve(token))
                );
              })
          );
      })
      .then((token) => {
        // respond with the token upon successful login
        res.json({ error: null, token });
        // register that the user logged in
      })
      .catch(next);
  },
  async getStaff(req, res) {
    res.json({ error: null, user: req.user.getUserProfile() });
  },
  async updateStaff(req, res, next) {
    if (!req.body.user) return next(new error.BadRequest());

    // construct new, sanitized object of update information
    const updatedInfo = {};
    // for each field { fistName, lastName, major, year }
    //   check that it is a valid input and it has changed
    if (
      req.body.user.firstName &&
      req.body.user.firstName.length > 0 &&
      req.body.user.firstName !== req.user.firstName
    )
      updatedInfo.firstName = req.body.user.firstName;
    if (
      req.body.user.lastName &&
      req.body.user.lastName.length > 0 &&
      req.body.user.lastName !== req.user.lastName
    )
      updatedInfo.lastName = req.body.user.lastName;

    /*
        update the user information normally
        (with the given information, without any password changes)
      */
    req.user
      .update(updatedInfo)
      .then((user) => {
        // respond with the newly updated user profile
        res.json({ error: null, user: user.getUserProfile() });
      })
      .catch(next);
  },
};
