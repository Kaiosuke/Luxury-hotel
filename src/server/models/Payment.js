import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const PaymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    cartId: { type: Schema.Types.ObjectId, require: true },
    amount: { type: Number, require: true },
    paymentMethod: { type: String, require: true },
  },
  { timestamps: true }
);

PaymentSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Payment = mongoose.model("payments", PaymentSchema);
export default Payment;
