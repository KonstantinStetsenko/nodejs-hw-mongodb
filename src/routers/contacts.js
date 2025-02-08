import express from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

import { ROLES } from '../constants/constSort.js';
import {
  createContactController,
  deleteContactController,
  getContactIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema } from '../validation/creatContactvalidation.js';
import { isValidId } from '../validation/isValidId.js';
import { updateContactValidationSchema } from '../validation/updateContactvalidation.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContactController),
);

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactIdController),
);

router.put(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
