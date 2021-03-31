/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../../common/env');
const error = require('../../../common/error');
const { default: l } = require('../../../common/logger');
const { User } = require('../../../database');

const router = express.Router();

const TOKEN_EXPIRES = 7*86400; // 7 day in seconds

/**
 * Middleware function that determines whether or not a user is authenticated
 * and assigns the req.user object to their user info from the db
 *
 * @param req The request object
 * @param res The response object
 * @param next The next-middleware function
 */
export const authenticated = (req, res, next) => {
  // We're looking for a header in the form of:
  //   Authorization: Bearer <TOKEN>
  const referer = req.originalUrl;
  // eslint-disable-next-line prettier/prettier
  if (referer.includes('login') || referer.includes('signup') ) return next();
  const authHeader = req.get('Authorization');
  if (!authHeader) return next(new error.Unauthorized());

  // authHead should be in the form of ['Bearer', '<TOKEN>']
  const authHead = authHeader.split(' ');
  if (
    authHead.length != 2 ||
    authHead[0] !== 'Bearer' ||
    authHead[1].length < 1
  )
    return next(new error.Unauthorized());

  const token = authHead[1];
  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) return next(new error.Unauthorized());

    // if the user provided a valid token, use it to deserialize the UUID to
    // an actual user object
    User.findByUUID(decoded.uuid)
      .then((user) => {
        if (!user) throw new error.Unauthorized();
        req.user = user;
      })
      .then(next)
      .catch(next);
  });
};

/**
 * Login route.
 *
 * POST body should be in the format of { email, password }
 * On success, this route will return a token
 */
router.post('/login', (req, res, next) => {
  if (!req.body.email || req.body.email.length < 1)
    return next(new error.BadRequest('Email must be provided'));

  if (!req.body.password || req.body.password.length < 1)
    return next(new error.BadRequest('Password must be provided'));

  let userInfo = null;
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
          if (!verified) throw new error.UserError('Invalid email or password');
          userInfo = user;
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
});

/**
 * Registration route.
 *
 * POST body accepts a user object (see DB schema for user, sanitize function)
 * Returns the created user on success
 */
router.post('/register', (req, res, next) => {
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
  // TODO: implement email auth instead of just active
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
});

export default router;
