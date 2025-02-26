import { Router } from 'express';
import userRoute from '../modules/User/user.route';
import authRoute from '../modules/Auth/auth.route';
import bikeRoute from '../modules/Bike/bike.route';
import rentalRoute from '../modules/Rental/rental.route';
import couponRoute from '../modules/Coupon/coupon.route';
import reviewRoute from '../modules/review/review.route';
import paymentRoute from '../modules/payment/payment.route';

const router = Router();
const moduleRoutes = [
  { path: '/users', route: userRoute },
  { path: '/bikes', route: bikeRoute },
  { path: '/auth', route: authRoute },
  { path: '/rentals', route: rentalRoute },
  { path: '/payments', route: paymentRoute },
  { path: '/coupons', route: couponRoute },
  { path: '/reviews', route: reviewRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
