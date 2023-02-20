require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const { connection } = require("mongoose");
const { usersRouter } = require("./routes/Users.routes");
const { postsRouter } = require("./routes/Posts.routes");

app.use(cors());
app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("Can't connect to mongoDB");
  }

  console.log(`Server running at port ${process.env.PORT}`);
});
