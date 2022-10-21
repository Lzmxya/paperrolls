interface IQuery {
  $and: { $or: object[] }[];
}

export const queryBuilder = (terms: string[], fields: string[]) => {
  const query: IQuery = { $and: [] };

  for (let i = 0; i < terms.length; i++) {
    const subQuery = { $or: [] };
    query.$and.push(subQuery);

    for (let j = 0; j < fields.length; j++) {
      query.$and[i].$or.push({ [fields[j]]: `'${terms[i]}` });
    }
  }

  return query;
};
