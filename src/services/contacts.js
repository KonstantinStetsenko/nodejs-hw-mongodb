import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/constSort.js';
import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = ['name', 'phoneNumber'],
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { date: contacts, ...paginationData };
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
