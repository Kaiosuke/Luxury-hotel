import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import connect from "./config/db.js";
import env from "./config/envConfig.js";
import routes from "./routes/index.js";
import cleanupCart from "./jobs/cartCleanup.js";

connect();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", cors());

routes(app);

const port = env.PORT;

cleanupCart();

app.use((req, res) => {
  return res.send("Not found page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
