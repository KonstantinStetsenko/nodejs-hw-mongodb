// import * as authSchemas from '../validation/auth.js';

// const { loginUserSchema, registerUserSchema } = authSchemas;

import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import * as schemas from '../validation/auth.js';

const { loginUserSchema, registerUserSchema } = schemas;

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;
