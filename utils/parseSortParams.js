import { SORT_ORDER } from '../src/constants/constSort.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = ['name', 'phoneNumber'];
  if (keysOfContacts.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return { sortOrder: parsedSortOrder, sortBy: parsedSortBy };
};
