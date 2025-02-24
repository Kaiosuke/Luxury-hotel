import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const RoomSchema = new Schema(
  {
    roomTypeId: {
      type: Schema.Types.ObjectId,
      ref: "roomTypes",
      require: true,
    },
    roomNumber: { type: Number, require: true },
    floor: { type: Number, require: true },
    status: { type: String, require: true },
    bookedDates: [
      {
        from: Date,
        to: Date,
      },
    ],
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
