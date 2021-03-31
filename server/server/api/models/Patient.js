/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
// const Address = require("./Address");

module.exports = (Sequelize, db) => {
  const Patient = db.define('patient', {
    // patient ID: main way of querying the patient
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // patient firstName
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Patients first name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The patients first name is a required field',
        },
      },
    },

    // patient lastName
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Patients last name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The patients last name is a required field',
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

    // date of birth
    birthDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },

    // patient gender
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'gender last name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The patients gender is a required field',
        },
      },
    },

    //isMarried (Need an example of boolean type)
    isMarried: {
      type: Sequelize.ENUM('MARRIED', 'UNMARRIED'),
      defaultValue: 'UNMARRIED',
    },

    //externalDoctor
    externalDoctor: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Patients first name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The patients first name is a required field',
        },
      },
    },

    //divisionID
    divisionId: {
      type: Sequelize.INTEGER,
    },

    // address ID: main way of querying the address
    addressId: {
      type: Sequelize.INTEGER,
    },

    //isAdmitted
    isAdmitted: {
      type: Sequelize.ENUM('NOT_ADMITTED', 'ADMITTED', 'DISCHARGED'),
      defaultValue: 'NOT_ADMITTED',
    },

    //isRequested
    isRequested: {
      type: Sequelize.ENUM('NOT_REQUESTED', 'REQUESTED', 'REQUEST_COMPLETED'),
      defaultValue: 'NOT_REQUESTED',
    },
  });

  Patient.findById = function (id) {
    return this.findOne({ where: { id } });
  };

  Patient.findByfirstName = function (firstName) {
    return this.findOne({ where: { firstName } });
  };

  Patient.findBylastName = function (lastName) {
    return this.findOne({ where: { lastName } });
  };

  Patient.findByTelephone = function (telephone) {
    return this.findOne({ where: { telephone } });
  };

  Patient.findBybirthDate = function (birthDate) {
    return this.findOne({ where: { birthDate } });
  };

  Patient.findBygender = function (gender) {
    return this.findOne({ where: { gender } });
  };

  Patient.findBymarried = function (isMarried) {
    return this.findOne({ where: { isMarried } });
  };

  Patient.findByExDoctor = function (externalDoctor) {
    return this.findOne({ where: { externalDoctor } });
  };

  Patient.findByDivisionId = function (divisionId) {
    return this.findOne({ where: { divisionId } });
  };

  return Patient;
};
