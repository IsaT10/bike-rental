import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  createBike,
  deleteBike,
  getAllBike,
  updateBike,
} from './bike.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(createBikeValidationSchema),
  createBike
);

router.get('/', getAllBike);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(updateBikeValidationSchema),
  updateBike
);

router.delete('/:id', auth('admin'), deleteBike);

export default router;
