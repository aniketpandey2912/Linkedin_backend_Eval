const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");

usersRouter.get("/", (req, res) => {
  res.send({ msg: "all users" });
});

usersRouter.post("/register", async (req, res) => {
  let { name, email, gender, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      try {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();
        res.send({ msg: "Registration successfull" });
      } catch (err) {
        res.send({ msg: "Something went wrong" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({
            msg: "Login successfull",
            displayName: user[0].name,
            token: token,
          });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Wrong Credentials" });
  }
});

module.exports = { usersRouter };
