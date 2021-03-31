import * as express from 'express';
import facade from './facade';

const router = express.Router();

router
  .route('/')
/**
 * Create a prescription for the patient 
 */
  .post(facade.createPrescription);
  
export default router;
