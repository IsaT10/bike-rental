import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
} from './coupon.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createCouponValidationSchema,
  updateCouponValidationSchema,
} from './coupon.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(createCouponValidationSchema),
  createCoupon
);

router.get('/', getAllCoupons);
router.get('/:code', getSingleCoupon);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(updateCouponValidationSchema),
  updateCoupon
);

router.delete('/:id', auth('admin'), deleteCoupon);

export default router;
