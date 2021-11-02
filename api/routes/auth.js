import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";

const authRouter = express.Router();

//REGISTER
authRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // crypto-js packace script to encrypt password.
    password: CryptoJS.AES.encrypt(
      "req.body.password",
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    // find the user. if email = request (req.body.email)
    const user = await User.findOne({ email: req.body.email });
    // if there is no user with that email send a status error
    !user && res.status(401).json("Wrong password or username!");

    // crypto-js script to decrypt password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default authRouter;
