const deleteData = async (model, id) => {
  const delData = await model.delete({ _id: id });
  return delData;
};

const forceDeleteData = async (model, id) => {
  const delData = await model.deleteOne({ _id: id });
  return delData;
};

export { deleteData, forceDeleteData };
