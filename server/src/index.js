import express from "express";
import cors from "cors";
import { signup, login } from "./app.js";
import connectToDb from "./db/index.js";
import cookieparser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";

const PORT = 5001;
const app = express();

app.use(express.json());

app.use(cookieparser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/ping", (req, res) => {
  res.send(" Instagram");
});

app.use("/signup", signup);

app.use("/login", login);

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is running at localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(" App CONNECTION FAILED !! : ", error);
  });
