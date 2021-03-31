/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const AdmissionRequest = require('./AdmissionRequest');
const Room = require('./Room');

module.exports = (Sequelize, db) => {
  const Division = db.define('division', {
    // division ID: main way of querying the division
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // division name
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Division name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The division name is a required field',
        },
      },
    },

    // location name
    location: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Location name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The location name is a required field',
        },
      },
    },

    // number of beds
    numberOfBeds: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Number of beds must be at least a character long',
        },
        notEmpty: {
          msg: 'The number of beds is a required field',
        },
      },
    },

    // telephone
    telephone: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Telephone must be at least a character long',
        },
        notEmpty: {
          msg: 'The telephone is a required field',
        },
      },
    },

    // charge nurse ID: main way of querying the charge nurse
    chargeNurseId: {
      type: Sequelize.INTEGER,
    },

    // type of division
    //   UNCOMPLETED - not a completed division
    //   COMPLETED   - a completed division
    divisionType: {
      type: Sequelize.ENUM('UNCOMPLETED', 'COMPLETED'),
      defaultValue: 'UNCOMPLETED',
    },
  });

  Division.findByName = function (name) {
    return this.findOne({ where: { name } });
  };

  Division.findByLocation = function (location) {
    return this.findOne({ where: { location } });
  };

  Division.findByNumberOfBeds = function (numberOfBeds) {
    return this.findOne({ where: { numberOfBeds } });
  };

  Division.findByTelephone = function (telephone) {
    return this.findOne({ where: { telephone } });
  };

  Division.findByChargeNurseID = function (chargeNurseId) {
    return this.findOne({ where: { chargeNurseId } });
  };

  Division.getAllAdmissionRequests = function (id) {
    AdmissionRequest.findByDivisionId(id);
  };

  Division.getAllRooms = function (id) {
    Room.findByDivisionId(id);
  };

  Division.prototype.isCompleted = function () {
    return this.getDataValue('divisionType') === 'COMPLETED';
  };

  Division.prototype.isUncompleted = function () {
    return this.getDataValue('divisionType') === 'UNCOMPLETED';
  };

  return Division;
};
