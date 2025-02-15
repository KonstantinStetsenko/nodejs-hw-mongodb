// import * as authSchemas from '../validation/auth.js';

// const { loginUserSchema, registerUserSchema } = authSchemas;

import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../../src/controllers/auth.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

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
router.post(
  '/send-reset-email',
  validateBody(schemas.requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(schemas.resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
