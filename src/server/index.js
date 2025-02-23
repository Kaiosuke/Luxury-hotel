import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./config/db.js";
import routes from "./routes/index.js";
import env from "./config/envConfig.js";

connect();

const app = express();

app.use(json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

routes(app);

const port = env.PORT;

app.use((req, res) => {
  return res.send("Not found page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
