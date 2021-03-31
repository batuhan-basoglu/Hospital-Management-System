import l from '../../../common/logger';

// EXAMPLE DATA - Will be replaced by data from DB
const division = ['division1', 'division2', 'division3', 'division4'];
const db = {
  find: (id) => division[id],
  save: (newDivision) => division.push(newDivision),
};

class DivisionRepository {
  find(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.find(id);
  }

  save(division) {
    return db.save(division);
  }
}

export default new DivisionRepository();
