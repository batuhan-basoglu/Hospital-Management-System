import Patient from '../../models/Patient';
import Repository from './repository';
import Address from '../../models/Address';

module.exports = {
  async registerPatient(req, res) {
    const {
      firstName,
      lastName,
      telephone,
      dateOfBirth,
      gender,
      maritalStatus,
      externalDoctor,
      divisionId,
    } = req.body;

    Repository.save(
      Patient.create({
        firstName,
        lastName,
        telephone,
        gender,
        maritalStatus,
        externalDoctor,
        divisionId,
        birthDate: dateOfBirth,
      })
    );
  },

  async getPatientFile(req, res) {
    const { id } = req.body;
    const patient = await Repository.find(id);

    return res.json(patient);
  },

  async updatePatientFile(req, res) {
    const {
      firstName,
      id,
      lastName,
      telephone,
      dateOfBirth,
      gender,
      maritalStatus,
      externalDoctor,
      divisionId,
      address,
    } = req.body;
    let patient = await Repository.find(id);

    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.telephone = telephone;
    patient.dateOfBirth = dateOfBirth;
    patient.gender = gender;
    patient.maritalStatus = maritalStatus;
    patient.externalDoctor = externalDoctor;
    patient.divisionId = divisionId;
    patient.address = address;
    patient = await patient.save();
  },
};
