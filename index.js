import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
// import Comments from "./models/CommentsModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
  // await Comments.sync();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(router);

app;
app.listen(5000, () => console.log("Server is running on port 5000"));
