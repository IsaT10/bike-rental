import { Router } from 'express';
import userRoute from '../modules/User/user.route';
import authRoute from '../modules/Auth/auth.route';
import bikeRoute from '../modules/Bike/bike.route';
import rentalRoute from '../modules/Rental/rental.route';
import couponRoute from '../modules/Coupon/coupon.route';

const router = Router();
const moduleRoutes = [
  { path: '/users', route: userRoute },
  { path: '/bikes', route: bikeRoute },
  { path: '/auth', route: authRoute },
  { path: '/rentals', route: rentalRoute },
  { path: '/coupons', route: couponRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
