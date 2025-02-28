import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const UserSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "ceo"],
      require: true,
    },
    password: { type: String, require: true },
    phoneNumber: { type: String, default: "" },
    country: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
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

    resetToken: { type: String, default: null },
    resetTokenExpire: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const User = mongoose.model("users", UserSchema);
export default User;
