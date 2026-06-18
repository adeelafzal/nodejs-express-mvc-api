const express = require("express");

const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares/index_middleware");
const userRouter = require("./routes/user_route");

const app = express();
const port = 8000;

connectMongoDB("mongodb://localhost:27017/company")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error wile connecting", error));

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt"));

app.use("/api/users", userRouter);

app.listen(port, () => console.log("Server connected"));
