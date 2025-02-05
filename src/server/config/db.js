import mongoose from "mongoose";
import env from "./envConfig.js";

const connect = async () => {
  try {
    await mongoose.connect(env.MONGO_CONNECT);
    console.log("Connect Successfully");
  } catch {
    console.log("Connect failed");
  }
};

export default connect;
