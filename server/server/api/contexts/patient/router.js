import * as express from 'express';
import facade from './facade';

const router = express.Router();

/**
 * Get patient file
 */
router
  .route('/')
  .get(facade.getPatientFile)
  /**
   * Update patient file
   */
  .patch(facade.updatePatientFile)
  /**
   * Update patient file
   */
  .post(facade.registerPatient);

export default router;
