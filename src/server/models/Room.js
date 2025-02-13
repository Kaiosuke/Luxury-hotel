import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const RoomSchema = new Schema(
  {
    roomTypeId: { type: String, require: true },
    roomNumber: { type: Number, require: true },
    floor: { type: String, require: true },
    status: { type: String, require: true },
    bookedDates: [{ type: String, require: true }],
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "carts",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

RoomSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Room = mongoose.model("rooms", RoomSchema);
export default Room;
