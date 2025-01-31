const parseType = (type) => {
  if (typeof type !== 'string') return undefined;

  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'true'
      ? true
      : lowerCaseValue === 'false'
      ? false
      : undefined;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  if (!query) return {};

  const { isFavourite, type } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
