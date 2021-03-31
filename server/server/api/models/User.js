/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const _ = require('underscore');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const HASH_ROUNDS = 10;

module.exports = (Sequelize, db) => {
  const User = db.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // user ID: main way of querying the user
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      // email address of the user
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'The email you entered is not valid',
          },
          notEmpty: {
            msg: 'The email is a required field',
          },
        },
      },

      // type of account
      //   RESTRICTED - not used currently
      //   STANDARD   - a regular member
      //   ADMIN      - admin type user
      accessType: {
        type: Sequelize.ENUM('STAFF', 'MEDICAL', 'NURSE', 'ADMIN'),
        defaultValue: 'STAFF',
      },

      // account state
      //   PENDING        - account pending activation (newly created)
      //   ACTIVE         - account activated and in good standing
      //   BLOCKED        - account is blocked, login is denied
      //   PASSWORD_RESET - account has requested password reset
      state: {
        type: Sequelize.ENUM('PENDING', 'ACTIVE', 'BLOCKED', 'PASSWORD_RESET'),
        defaultValue: 'PENDING',
      },

      // user's first name
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Your first name must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The first name is a required field',
          },
        },
      },

      // user's last name
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Your last name must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The last name is a required field',
          },
        },
      },

      // user's password hash
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The password cannot be empty',
          },
        },
      },

      // date of last login
      lastLogin: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      // creating indices on frequently accessed fields improves efficiency
      indexes: [
        // a hash index on the uuid makes lookup by UUID O(1)
        {
          unique: true,
          fields: ['uuid'],
        },

        // a hash index on the email makes lookup by email O(1)
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );

  User.findByUUID = function (uuid) {
    return this.findOne({ where: { uuid } });
  };

  User.findByEmail = function (email) {
    return this.findOne({ where: { email } });
  };

  User.generateHash = function (password) {
    return bcrypt.hash(password, HASH_ROUNDS);
  };

  User.generateAccessCode = function () {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, data) => {
        if (err) return reject(err);
        resolve(data.toString('hex'));
      });
    });
  };

  User.sanitize = function (user) {
    user = _.pick(user, ['email', 'firstName', 'lastName']);
    if (user.email) user.email = user.email.toLowerCase();
    return user;
  };

  User.prototype.getPublicProfile = function () {
    return {
      firstName: this.getDataValue('firstName'),
      lastName: this.getDataValue('lastName'),
      picture: this.getDataValue('picture'),
    };
  };

  User.prototype.getUserProfile = function () {
    const uuid = this.getDataValue('uuid');
    return {
      uuid,
      firstName: this.getDataValue('firstName'),
      lastName: this.getDataValue('lastName'),
      accessType: this.getDataValue('accessType'),
      picture: `https://www.gravatar.com/avatar/${uuid.replace(
        /[^0-9a-f]/g,
        ''
      )}?d=identicon&s=300`,
      email: this.getDataValue('email'),
    };
  };

  User.prototype.verifyPassword = function (password) {
    return bcrypt.compare(password, this.getDataValue('hash'));
  };

  User.prototype.isAdmin = function () {
    return this.getDataValue('accessType') === 'ADMIN';
  };

  User.prototype.isStandard = function () {
    return this.getDataValue('accessType') === 'STANDARD';
  };

  User.prototype.isRestricted = function () {
    return this.getDataValue('accessType') === 'RESTRICTED';
  };

  User.prototype.isActive = function () {
    return this.getDataValue('state') === 'ACTIVE';
  };

  User.prototype.isPending = function () {
    return this.getDataValue('state') === 'PENDING';
  };

  User.prototype.isBlocked = function () {
    return this.getDataValue('state') === 'BLOCKED';
  };

  User.prototype.requestedPasswordReset = function () {
    return this.getDataValue('state') === 'PASSWORD_RESET';
  };

  return User;
};
