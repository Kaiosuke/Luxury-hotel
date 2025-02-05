import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const TypeBedSchema = new Schema(
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
  { timeseries: true }
);

TypeBedSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const TypeBed = mongoose.model("typeBeds", TypeBedSchema);
export default TypeBed;
