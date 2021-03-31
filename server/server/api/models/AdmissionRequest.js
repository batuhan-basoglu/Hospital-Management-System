/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

module.exports = (Sequelize, db) => {
  const AdmissionRequest = db.define(
    'admissionRequest',
    {
      // admission request ID: main way of querying the admission request
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // division ID: main way of querying the division
      divisionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },

      // rationale name
      rationale: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Rationale name must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The rationale name is a required field',
          },
        },
      },

      // local doctor name
      localDoctor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Local Doctor must be at least 2 characters long',
          },
          notEmpty: {
            msg: 'The local doctor is a required field',
          },
        },
      },

      // patient ID: main way of querying the patient
      patientId: {
        type: Sequelize.INTEGER,
      },

      // type of admission
      //   UNAPPROVED - not a approved admission
      //   APPROVED   - a approved admission
      approvalType: {
        type: Sequelize.ENUM('UNAPPROVED', 'APPROVED'),
        defaultValue: 'UNAPPROVED',
      },

    },
    
  );

  AdmissionRequest.findById = function(id){
    return this.findOne({where: {id}})
  }

  AdmissionRequest.findByDivisionId = function(divisionId){
    return this.findAll({where: {divisionId}})
  }

  AdmissionRequest.findByRationale = function (rationale) {
    return this.findOne({ where: { rationale } });
  };

  AdmissionRequest.findByLocalDoctor = function (localDoctor) {
    return this.findOne({ where: { localDoctor } });
  };

  AdmissionRequest.findByPatientId = function (patientId) {
    return this.findOne({ where: { patientId } });
  };

  AdmissionRequest.prototype.isApproved = function () {
    return this.getDataValue('approvalType') === 'APPROVED';
  };

  AdmissionRequest.prototype.isUnapproved = function () {
    return this.getDataValue('approvalType') === 'UNAPPROVED';
  };

  return AdmissionRequest;
};