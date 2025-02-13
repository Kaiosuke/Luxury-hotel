import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const ReviewSchema = new Schema(
  {
    userId: { type: String, require: true, ref: "users" },
    title: { type: String, require: true },
    roomTypeId: {
      type: Schema.Types.ObjectId,
      ref: "roomTypes",
      require: true,
    },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

ReviewSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Review = mongoose.model("reviews", ReviewSchema);
export default Review;
