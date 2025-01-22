import express from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactController,
  getContactIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
export default router;
