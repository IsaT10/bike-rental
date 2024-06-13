import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from '../User/user.validation';
import { login, signUp } from './auth.controller';
import { lgoinUserValidationSchema } from './auth.validation';

const router = Router();

router.post('/signup', validateRequest(createUserValidationSchema), signUp);
router.post('/login', validateRequest(lgoinUserValidationSchema), login);

export default router;
