const findByIdAndUpdateData = async (model, id, data) => {
  const updateData = await model.findByIdAndUpdate(id, data, { new: true });
  return updateData;
};

// const updateManyData=  async(model, id)

const findByIdAndPushData = async (model, id, data, dataId) => {
  const updateData = await model.findByIdAndUpdate(id, {
    $push: { [data]: dataId },
  });
  return updateData;
};

const findByIdAndPullData = async (model, id, data, dataId) => {
  const updateData = await model.findByIdAndUpdate(id, {
    $pull: { [data]: dataId },
  });
  return updateData;
};

const restoreData = async (model, id) => {
  const updateData = await model.restore({ _id: id });
  return updateData;
};

export {
  findByIdAndUpdateData,
  findByIdAndPushData,
  findByIdAndPullData,
  restoreData,
};
