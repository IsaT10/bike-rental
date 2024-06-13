import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = Router();

router.get('/', getAllUsers);
router.post('/', validateRequest(createUserValidationSchema), createUser);

router.patch('/:id', updateUser);
router.get('/:id', getSingleUser);

export default router;
