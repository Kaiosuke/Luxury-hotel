import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const RoomTypeSChema = new Schema(
  {
    thumbnail: { type: String, require: true },
    viewId: {
      type: Schema.Types.ObjectId,
      ref: "views",
      require: true,
    },
    typeBedId: {
      type: Schema.Types.ObjectId,
      ref: "typeBeds",
      require: true,
    },
    categoryRoomId: {
      type: Schema.Types.ObjectId,
      ref: "categoryRooms",
      require: true,
    },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    rate: { type: Number, require: true },
    description: { type: String, require: true },
    quickDes: [{ type: String, require: true }],
    features: [{ type: String, require: true }],
    square: { type: String, require: true },
    sleeps: { type: String, require: true },
    images: [{ type: String, require: true }],
    map: { type: String, require: true },
    detailFeatures: [{ type: String, require: true }],
    shortDes: { type: String, require: true },
    detailDes: { type: String, require: true },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "carts",
        require: true,
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "reviews",
        require: true,
      },
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "rooms",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

RoomTypeSChema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const RoomType = mongoose.model("roomTypes", RoomTypeSChema);
export default RoomType;
