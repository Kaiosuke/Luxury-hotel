import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 8888,
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  DEFAULT_USER: process.env.DEFAULT_USER,
  DEFAULT_VIEW: process.env.DEFAULT_VIEW,
  DEFAULT_TYPE_BED: process.env.DEFAULT_TYPE_BED,
  DEFAULT_CATEGORY_ROOM: process.env.DEFAULT_CATEGORY_ROOM,
  DEFAULT_FOOD: process.env.DEFAULT_FOOD,
  DEFAULT_ROOM_TYPE: process.env.DEFAULT_ROOM_TYPE,
  DEFAULT_OPTION: process.env.DEFAULT_OPTION,
  DEFAULT_ROOM: process.env.DEFAULT_ROOM,
};

export default env;
