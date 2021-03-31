/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

module.exports = (Sequelize, db) => {
  const Medication = db.define(
    'medication',
    {
      // drug number for id 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // drug name 
      drugName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'The drug name must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The drug name is a required field',
          },
        },
      },

      // number of units to take per day
      unitsByDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Units must be at least a character long',
          },
          notEmpty: {
            msg: 'The number of units is a required field',
          },
        },
      },

      // number of administrations of the drug 
      numberOfAdmins: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: '# of admins must be at least a character long',
          },
          notEmpty: {
            msg: 'The number of admins is a required field',
          },
        },
      },

            
      // times of the drug administrations
      adminTimes: {
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW,
      },

      // method of drug administration
      methodOfAdmin: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'method of administration must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The method of administration name is a required field',
          },
        },
      },


      // start date of drug administering 
      startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      
      // when the prescription ends 
      finishDate: {
        type: Sequelize.DATE,
      },

    },
    
  );


  Medication.findById = function (id) {
    return this.findOne({ where: { id } });
  };

  Medication.findByDrugName = function (drugName) {
    return this.findOne({ where: { drugName } });
  };

  Medication.findByUnitsByDay = function (unitsByDay) {
    return this.findOne({ where: { unitsByDay } });
  };

  Medication.findByNumberOfAdmins = function (numberOfAdmins) {
    return this.findOne({ where: { numberOfAdmins } });
  };

  Medication.findByAdminTimes = function (adminTimes) {
    return this.findOne({ where: { adminTimes } });
  };

  Medication.findByMethodOfAdmin = function (methodOfAdmin) {
    return this.findOne({ where: { methodOfAdmin } });
  };

  Medication.findByStartDate = function (startDate) {
    return this.findOne({ where: { startDate } });
  };

  Medication.findByFinishDate = function (finishDate) {
    return this.findOne({ where: { finishDate } });
  };

  return Medication;
};