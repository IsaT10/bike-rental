import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  createBike,
  deleteBike,
  getAllBike,
  updateBike,
} from './bike.controller';

const router = Router();

router.post('/', auth('admin'), createBike);

router.get('/', getAllBike);

router.put('/:id', auth('admin'), updateBike);

router.delete('/:id', auth('admin'), deleteBike);

export default router;
