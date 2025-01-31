import express from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactController,
  getContactIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema } from '../validation/creatContactvalidation.js';
import { isValidId } from '../validation/isValidId.js';
import { updateContactValidationSchema } from '../validation/updateContactvalidation.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactIdController),
);
router.post(
  '/contacts',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default router;
