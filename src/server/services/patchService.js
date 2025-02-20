const findByIdAndUpdateData = async (model, id, data, populate = []) => {
  let updateData = model.findByIdAndUpdate(id, data, { new: true });

  if (populate.length) {
    populate.forEach((field) => {
      const [path, select] = Object.entries(field)[0];
      updateData = updateData.populate(path, select);
    });
  }

  return await updateData;
};

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
