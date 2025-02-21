const getAllData = async (model, populate = [], search) => {
  let query = model.find({ title: { $regex: search, $options: "i" } });
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }
  return query;
};

const getAllUser = async (model, populate = [], search) => {
  let query = model.find({ username: { $regex: search, $options: "i" } });
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }
  return query;
};

const getAllDataDeleted = async (model, populate = [], search) => {
  let query = model.find(
    { deleted: true, title: { $regex: search, $options: "i" } },
    null,
    { withDeleted: true }
  );
  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }
  return query;
};

const getAllUserDeleted = async (model, populate = [], search) => {
  let query = model.find(
    { deleted: true, username: { $regex: search, $options: "i" } },
    null,
    { withDeleted: true }
  );
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

export {
  getAllData,
  getAllDataDeleted,
  getData,
  getDataById,
  getAllUser,
  getAllUserDeleted,
};
