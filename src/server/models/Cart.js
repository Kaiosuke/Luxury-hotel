import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "rooms",
      require: true,
    },
    roomTypeId: {
      type: Schema.Types.ObjectId,
      ref: "roomTypes",
      require: true,
    },
    optionId: {
      type: Schema.Types.ObjectId,
      ref: "options",
      require: true,
    },
    status: { type: String, require: true },
    price: { type: number, require: true },
    totalPrice: { type: Number, require: true },
    day: { type: number, require: true },
    bookedDates: [{ type: String, require: true }],
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "payments",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

CartSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Cart = mongoose.model("carts", CartSchema);
export default Cart;
