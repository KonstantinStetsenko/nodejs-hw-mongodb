import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { parseFilterQuery } from '../../utils/parseFilterParams.js';
import { SORT_ORDER } from '../constants/constSort.js';
import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = ['name'],
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filterQuery = parseFilterQuery(filter);
  let contactsQuery = ContactsCollection.find({ userId });

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    console.log('Контакт не найден');
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create(...payload, userId);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId, userId },
    payload,
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

export const deleteContact = async (contactId, userId) => {
  // if (!mongoose.Types.ObjectId.isValid(contactId)) {
  //   throw createHttpError(404, 'Contact not found');
  // }
  const contact = await ContactsCollection.findByIdAndDelete({
    _id: contactId,
    userId,
  });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};
