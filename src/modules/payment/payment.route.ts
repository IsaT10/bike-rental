import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';

import { paymentValidationSchema } from './payment.validation';
import {
  getAllPayment,
  payment,
  saveTransaction,
  stripePayment,
  // stripePaymentSession,
  // stripeWebhook,
} from './payment.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.post('/create-payment-intent', stripePayment);
// router.post('/create-checkout-session', stripePaymentSession);
router.post('/save-transaction', auth('admin', 'user'), saveTransaction);
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(paymentValidationSchema),
  payment
);
router.get('/', auth('admin', 'user'), getAllPayment);
// router.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   stripeWebhook
// );

export default router;
