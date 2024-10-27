import { NextFunction, Request, Response, Router } from 'express';

import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from '../User/user.validation';
import { googleLogin, login, signUp } from './auth.controller';
import { lgoinUserValidationSchema } from './auth.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/signup',
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createUserValidationSchema),
  signUp
);
router.post('/login', validateRequest(lgoinUserValidationSchema), login);
router.post('/google-login', googleLogin);

export default router;
