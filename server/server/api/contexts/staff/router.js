import * as express from 'express';
import facade from './facade';

const router = express.Router();

/**
 * Get user profile for current user
 */
router
  .route('/')
  .get(facade.getStaff)
  /**
   * Update user information given a 'user' object with fields to update and updated information
   */
  .patch(facade.updateStaff);

router.post('/register', facade.register);
router.post('/login', facade.login);
export default router;
