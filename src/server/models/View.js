import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const ViewSchema = new Schema(
  {
    title: { type: String, require: true },
    roomTypes: [
      {
        type: Schema.Types.ObjectId,
        ref: "roomTypes",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

ViewSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const View = mongoose.model("views", ViewSchema);
export default View;
