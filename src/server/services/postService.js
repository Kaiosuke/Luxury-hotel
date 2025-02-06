const createData = async (model, data) => {
  const newData = await model.create(data);
  return newData;
};

export { createData };
