import * as express from 'express';
import facade from './facade';

const router = express.Router();

/**
 * Get division information
 */
router.route('/').get(facade.getDivisionInfo);

/**
 * Get division admission request list, Post admission request, Post patient admittance
 */
router.route('/AdmissionRequest').get(facade.getDivisionAdmissionRequestList).post(facade.createAdmissionRequest).post(facade.admitPatient);

/**
 * Post patient admittance to room, Post patient discharge from a room
 */
router.route('/Room/Bed').post(facade.admitPatientToRoom).post(facade.dischargePatient);


export default router;
