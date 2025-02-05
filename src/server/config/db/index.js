import mongoose from "mongoose";
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connect Successfully");
  } catch {
    console.log("Connect failed");
  }
};

export default connect;
