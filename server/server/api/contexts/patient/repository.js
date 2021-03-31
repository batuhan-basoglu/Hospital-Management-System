import l from '../../../common/logger';

// EXAMPLE DATA - Will be replaced by data from DB
const patient = ['patient'];
const db = {
  find: (id) => patient[id],
  save: (newPatient) => patient.push(newPatient),
};

class PatientRepository {
  find(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.find(id);
  }

  save(patient) {
    return db.save(patient);
  }
}

export default new PatientRepository();