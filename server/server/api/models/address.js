/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

module.exports = (Sequelize, db) => {
  const Address = db.define('address', {
    // address ID: main way of querying the address
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // street name
    streetNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Street number must be at least a character long',
        },
        notEmpty: {
          msg: 'The street number is a required field',
        },
      },
    },

    // street name
    streetName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Street name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The street name is a required field',
        },
      },
    },

    // city
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'City name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The city name is a required field',
        },
      },
    },

    //country
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Country name must be at least 2 characters long',
        },
        notEmpty: {
          msg: 'The country name is a required field',
        },
      },
    },

    // zip
    zip: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Zip must be at least a character long',
        },
        notEmpty: {
          msg: 'The zip is a required field',
        },
      },
    },

    // apartment number
    aptNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Apartment number must be at least a character long',
        },
        notEmpty: {
          msg: 'The apartment number is a required field',
        },
      },
    },

    //patientID
    patientId: {
      type: Sequelize.INTEGER,
    },
  });

  return Address;
};
