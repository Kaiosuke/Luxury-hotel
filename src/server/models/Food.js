import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const FoodSChema = new Schema(
  {
    title: { type: String, require: true },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "options",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

FoodSChema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Food = mongoose.model("foods", FoodSChema);
export default Food;
