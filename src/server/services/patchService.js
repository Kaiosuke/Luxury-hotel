import { model } from "mongoose";

const findByIdAndUpdate = async (model, id, data) => {
  const updateData = await model.findByIdAndUpdate(id, data, { new: true });
  return updateData;
};

export { findByIdAndUpdate };
