import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 8888,
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};

export default env;
