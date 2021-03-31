/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

module.exports = (Sequelize, db) => {
  const Bed = db.define(
    'bed',
    {
      // Bed number
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // room ID: main way of querying the room
      roomId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },

      // patient ID: main way of querying the patient
      patientId: {
        type: Sequelize.INTEGER,
      },

      // type of admission
      //   UNOCCUPIED - not a occupied admission
      //   OCCUPIED   - a occupied admission
      bedType: {
        type: Sequelize.ENUM('UNOCCUPIED', 'OCCUPIED'),
        defaultValue: 'UNOCCUPIED',
      },

    },
    
  );

  AdmissionRequest.findById = function (id) {
    return this.findOne({ where: { id } });
  };

  AdmissionRequest.findByRoomId = function(roomId){
    return this.findAll({where: {roomId}})
  }

  AdmissionRequest.findByPatientId = function (patientId) {
    return this.findOne({ where: { patientId } });
  };

  AdmissionRequest.prototype.isOccupied = function () {
    return this.getDataValue('bedType') === 'OCCUPIED';
  };

  AdmissionRequest.prototype.isUncompleted = function () {
    return this.getDataValue('bedType') === 'UNOCCUPIED';
  };


  return Bed;
};