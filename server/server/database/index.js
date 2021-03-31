const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');

const error = require('../common/error');
const devSetup = require('./dev-setup');

// The transaction namespace to use for transactions
const transactionNamespace = cls.createNamespace('default-transaction-ns');
Sequelize.useCLS(transactionNamespace);

const connection = new Sequelize(
  'postgres://zwkdknae:p-QIQup9VeqYckSDI0dCpZyCEI9OT0VW@salt.db.elephantsql.com:5432/zwkdknae'
);

const User = require('../api/models/User')(Sequelize, connection);
const Patient = require('../api/models/Patient')(Sequelize, connection);
const Address = require('../api/models/Address')(Sequelize, connection);
const Division = require('../api/models/Division')(Sequelize, connection);

/**
 * DB setup function to sync tables and add admin if doesn't exist
 */
const setup = (force, dev) =>
  (dev
    ? connection.sync({ force }).then(() => devSetup(User))
    : connection.sync({ force })
  ).then(() => {
    User.findOrCreate({
      where: { email: 'aaoun723@gmail.com' },
      defaults: {
        email: 'aaoun723@gmail.com',
        accessType: 'ADMIN',
        state: 'ACTIVE',
        firstName: 'Codehall',
        lastName: 'Admin',
        hash: '$2a$10$db7eYhWGZ1LZl27gvyX/iOgb33ji1PHY5.pPzRyXaNlbctCFWMF9G',
      },
    });
    Patient.findOrCreate({
      where: { id: 1 },
      defaults: {
        firstName: 'John',
        lastName: 'Steven',
        telephone: '1223123112',
        dateOfBirth: '01/23/1976',
        gender: 'Male',
        maritalStatus: 'Single',
        externalDoctor: 'Doctor Smith',
        divisionId: 1,
        address: 'address',
      },
    });

    Address.findOrCreate({
      where: { id: 1 },
      defaults: {
        streetNumber: 122,
        streetName: 'Elgin',
        city: 'Ottawa',
        country: 'Canada',
        zip: 'k1f3a2',
      },
    });

    Division.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Ward Pheloneus',
        location: 'East Wing',
        numberOfBeds: 35,
        telephone: 1234322323,
        chargeNurseId: 1,
      },
    });
  });

/**
 * Handles database errors (separate from the general error handler and the 404 error handler)
 *
 * Specifically, it intercepts validation errors and presents them to the user in a readable
 * manner. All other errors it lets fall through to the general error handler middleware.
 */
const errorHandler = (err, req, res, next) => {
  if (!err || !(err instanceof Sequelize.Error)) return next(err);
  if (err instanceof Sequelize.ValidationError) {
    const message = `Validation Error: ${err.errors
      .map((e) => e.message)
      .join('; ')}`;
    return next(new error.HTTPError(err.name, 422, message));
  }
  return next(new error.HTTPError(err.name, 500, err.message));
};

module.exports = {
  connection,
  User,
  setup,
  errorHandler,
};
