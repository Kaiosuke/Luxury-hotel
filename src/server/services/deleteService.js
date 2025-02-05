const deleteData = async (model, id) => {
  const delData = await model.delete({ _id: id });
  return delData;
};

export { deleteData };
