import { Router } from 'express';
import { getProfile, updateProfile } from './user.controller';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { updateUserValidationSchema } from './user.validation';

const router = Router();

router.get('/me', auth('admin', 'user'), getProfile);

router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(updateUserValidationSchema),
  updateProfile
);

export default router;
