import l from '../../../common/logger';

// EXAMPLE DATA - Will be replaced by data from DB
const staff = ['staff1', 'staff2', 'staff3', 'staff4'];
const db = {
  find: (id) => staff[id],
  save: (newStaff) => staff.push(newStaff),
};

class StaffRepository {
  find(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.find(id);
  }

  save(staff) {
    return db.save(staff);
  }
}

export default new StaffRepository();
