import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  changePaymentStatus,
  createRental,
  getAllRentals,
  getRentals,
  upadteRental,
} from './rental.controller';

const router = Router();

router.post('/', auth('admin', 'user'), createRental);

router.put('/:id/return', auth('admin'), upadteRental);
router.get('/', auth('admin', 'user'), getRentals);

router.get('/all', auth('admin'), getAllRentals);
router.patch('/:id', auth('admin', 'user'), changePaymentStatus);

export default router;
