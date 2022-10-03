interface IQuery {
  $and: { $or: object[] }[];
}

export const queryBuilder = (keywords: string[], fields: string[]) => {
  const query: IQuery = { $and: [] };

  for (let i = 0; i < keywords.length; i++) {
    const subQuery = { $or: [] };
    query.$and.push(subQuery);

    for (let j = 0; j < fields.length; j++) {
      query.$and[i].$or.push({ [fields[j]]: `'${keywords[i]}` });
    }
  }

  return query;
};
