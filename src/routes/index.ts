import { Router } from 'express';
import userRoute from '../modules/User/user.route';

const router = Router();
const moduleRoutes = [{ path: '/users', route: userRoute }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
