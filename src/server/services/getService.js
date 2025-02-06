const getAllData = async (model, populate = []) => {
  let query = model.find();
  if (populate.length) {
    populate.forEach((field) => {
      query = query.populate(field, "title");
    });
  }
  return query;
};

const getData = async (model, data, body, populate = []) => {
  const dataList = populate.length
    ? await model.findOne({ [data]: body }).populate(populate)
    : await model.findOne({ [data]: body });

  return dataList;
};

const getDataById = async (model, id, populate = []) => {
  let query = await model.findById(id);

  if (populate.length) {
    populate.forEach((field) => {
      query = query.populate(field, "title");
    });
  }
  return await query;
};

export { getAllData, getData, getDataById };
