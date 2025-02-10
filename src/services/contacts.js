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
  const contactsCount = await ContactsCollection.countDocuments({
    userId,
    ...filterQuery,
  });

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });

  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
