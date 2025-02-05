const getAll = async (model, populate = null) => {
  const dataList = populate
    ? await model.find().populate(populate)
    : await model.find();
  return dataList;
};

const get = async (model, data, populate = null) => {
  const dataList = populate
    ? await model.find({ data }).populate(populate)
    : await model.find();
  return dataList;
};

const getById = async (model, id, populate = null) => {
  const data = populate
    ? await model.findById(id).populate(populate)
    : await model.findById(id);
  return data;
};

export { getAll, get, getById };
