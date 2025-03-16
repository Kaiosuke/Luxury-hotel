import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const CategoryRoomSchema = new Schema(
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

CategoryRoomSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const CategoryRoom = mongoose.model("categoryRooms", CategoryRoomSchema);
export default CategoryRoom;
