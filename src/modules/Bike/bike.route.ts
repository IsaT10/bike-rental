import { NextFunction, Request, Response, Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  createBike,
  deleteBike,
  getAllBike,
  getSingleBike,
  updateBike,
} from './bike.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/',
  auth('admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createBikeValidationSchema),
  createBike
);

router.get('/', getAllBike);
router.get('/:id', getSingleBike);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(updateBikeValidationSchema),
  updateBike
);

router.delete('/:id', auth('admin'), deleteBike);

export default router;
