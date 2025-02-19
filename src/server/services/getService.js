const getAllData = async (model, populate = []) => {
  let query = model.find();
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }
  return query;
};

const getAllDataDeleted = async (model, populate = []) => {
  let query = model.find({ deleted: true }, null, { withDeleted: true });
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
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
  let query = model.findById(id);
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }
  return await query;
};

export { getAllData, getAllDataDeleted, getData, getDataById };
