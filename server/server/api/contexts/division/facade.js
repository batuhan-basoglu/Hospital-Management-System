import Division from '../../models/Division';
import AdmissionRequest from '../../models/AdmissionRequest';
import Patient from '../../models/Patient';
import Room from '../../models/Room';
import Repository from './repository';

module.exports = {
  async getDivisionInfo(req, res) {
    const { id } = req.body;
    const division = await Repository.find(id);

    return res.json(division);
  },

  async getDivisionAdmissionRequestList(req, res) {
    const { id } = req.body;
    const admissionList = Division.getAllAdmissionRequests(id);

    return res.json(admissionList);
  },

  async createAdmissionRequest(req, res) {
    const {divisionId, patientId, rationale, localDoctor} = req.body;
    AdmissionRequest.create({divisionId, patientId, rationale, localDoctor});
    
    let patient = await Patient.findById(patientId);
    patient.isRequested = 'REQUESTED';
    patient = await patient.save();
  },

  async admitPatient(req, res){
    const { patientId, admissionRequestId } = req.body;

    let admissionRequest = await AdmissionRequest.findById(admissionRequestId);
    admissionRequest.approvalType = 'APPROVED';
    admissionRequest = await admissionRequest.save();

    let patient = await Patient.findById(patientId);
    patient.isRequested = 'REQUEST_COMPLETED';
    patient = await patient.save();
  },

  async admitPatientToRoom(req, res){
    const {patientId, roomId, bedId} = req.body;
    const room = await Room.findById(roomId);
    let bed = await room.getBed(bedId);

    bed.patientId = patientId;
    bed.bedType = 'OCCUPIED';
    bed = await bed.save();

    let patient = await Patient.findById(patientId);
    patient.isAdmitted = 'ADMITTED';
    patient = await patient.save();
  },

  async dischargePatient(req, res){
    const {roomId, bedId} = req.body;
    const room = await Room.findById(roomId);
    let bed = await room.getBed(bedId);

    bed.patientId = 0;
    bed.bedType = 'UNOCCUPIED';
    bed = await bed.save();

    let patient = await Patient.findById(patientId);
    patient.isAdmitted = 'DISCHARGED';
    patient = await patient.save();
  },

  
};
