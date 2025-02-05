import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const RoomTypeSChema = new Schema(
  {
    thumbnail: { type: String, require: true },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    rate: { type: Number, require: true },
    category: { type: String, require: true },
    view: { type: String, require: true },
    description: { type: String, require: true },
    quickDes: [{ type: String, require: true }],
    features: [{ type: String, require: true }],
    square: { type: String, require: true },
    typeBed: { type: String, require: true },
    sleeps: { type: String, require: true },
    images: [{ type: String, require: true }],
    map: { type: String, require: true },
    detailFeatures: { type: String, require: true },
    shortDes: { type: String, require: true },
    detailDes: { type: String, require: true },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "carts",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "rooms",
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
