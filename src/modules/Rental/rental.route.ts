import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  cancleRent,
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
router.patch('/:id/cancelRent', auth('admin', 'user'), cancleRent);

export default router;
