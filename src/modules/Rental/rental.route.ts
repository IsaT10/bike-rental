import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { createRental, getRentals, upadteRental } from './rental.controller';

const router = Router();

router.post('/', auth('admin', 'user'), createRental);

router.put('/:id/return', auth('admin'), upadteRental);
router.get('/', auth('admin', 'user'), getRentals);

export default router;
