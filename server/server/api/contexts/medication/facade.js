import Medication from '../../models/Medication';


module.exports = {

    async createPrescription(req, res, next){

        const {drugName, unitsByDay, numberOfAdmins, adminTimes, methodOfAdmin, startDate, finishDate} = req.body;
        Medication.create({drugName, unitsByDay, numberOfAdmins, adminTimes, methodOfAdmin, startDate, finishDate});

    },

  
};