import createHttpError from 'http-errors';
import {
  creatContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(`Looking for contact with id: ${contactId}`);
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      console.log('Contact not found, throwing error');
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res) => {
  const contact = await creatContact(req.body);
  res.status(201).json({
    status: 201,
    massage: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};
// Удаление
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 204,
      message: 'Successfully delete contacts!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
