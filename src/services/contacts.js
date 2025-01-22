import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }
  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const creatContact = async (paylod) => {
  const contact = await ContactsCollection.create(paylod);
  return contact;
};

export const updateContact = async (contactId, paylod, options = {}) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
    paylod,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
      runValidators: true,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};
