const createData = async (model, data, populate = []) => {
  const newData = await model.create(data);
  let query = model.findById(newData._id);
  if (populate.length) {
    populate.forEach((field) => {
      let [path, select] = Object.entries(field)[0];
      query = query.populate(path, select);
    });
  }

  return await query;
};

export { createData };
