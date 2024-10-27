import { NextFunction, Request, Response, Router } from 'express';
import {
  deleteUser,
  getProfile,
  getUsers,
  roleChange,
  updateProfile,
} from './user.controller';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { updateUserValidationSchema } from './user.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.get('/me', auth('admin', 'user'), getProfile);
router.get('/', auth('admin'), getUsers);

router.patch('/:id', auth('admin'), roleChange);
router.delete('/:id', auth('admin'), deleteUser);

router.put(
  '/me',
  auth('admin', 'user'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateUserValidationSchema),
  updateProfile
);

export default router;
