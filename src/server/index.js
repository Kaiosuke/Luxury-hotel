import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./config/db/index.js";
import routes from "./routes/index.js";

dotenv.config();

connect();

const app = express();

app.use(json());

app.use(cookieParser());

app.use(cors());

const port = process.env.PORT;

routes(app);

app.use((req, res) => {
  return res.send("Not found page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
