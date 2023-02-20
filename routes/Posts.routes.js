const express = require("express");
const { Authenticator } = require("../middlewares/Authenticate.middleware");
const { PostModel } = require("../models/Post.model");
const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
  let q = req.query;
  try {
    let posts = await PostModel.find(q);
    res.send(posts);
  } catch {
    res.send({ msg: "Request failed" });
  }
});

postsRouter.get("/top", async (req, res) => {
  let q = req.query;
  let ID = req.headers.id;
  try {
    let posts = await PostModel.find({ ...q, userID: ID });
    res.send(posts);
  } catch {
    res.send({ msg: "Request failed" });
  }
});

postsRouter.patch("/update", Authenticator, async (req, res) => {
  let ID = req.headers.id;
  let payload = req.body;
  try {
    let posts = await PostModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: "Post info updated" });
  } catch {
    res.send({ msg: "Not authorized" });
  }
});

postsRouter.patch("/delete", Authenticator, async (req, res) => {
  let ID = req.headers.id;
  try {
    let posts = await PostModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: "Post deleted" });
  } catch {
    res.send({ msg: "Not authorized" });
  }
});

module.exports = { postsRouter };
