/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const Bed = require("./Bed");

module.exports = (Sequelize, db) => {
  const Room = db.define(
    'room',
    {
      // Room number
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

      // bed ID: main way of querying the bed
      bedId: {
        type: Sequelize.INTEGER,
      },

    },
    
  );

  Room.findById = function(id){
    return this.findOne({where: {id}})
  }

  Room.findBydivisionId = function(divisionId){
    return this.findAll({where: {divisionId}})
  }

  Room.getAllBeds = function(id){
    Bed.findByRoomId(id);
  }

  Room.getBed = function(bedId){
    Bed.findById(bedId);
  }

  return Room;
};