import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const OptionSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    extension: { type: String, require: true },
    typeDescription: { type: String, require: true },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "carts",
        require: true,
      },
    ],
    foodId: {
      type: Schema.Types.ObjectId,
      ref: "foods",
      require: true,
    },
  },
  { timestamps: true }
);

OptionSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Option = mongoose.model("options", OptionSchema);
export default Option;
