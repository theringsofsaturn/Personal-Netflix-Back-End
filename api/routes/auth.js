import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

//REGISTER
authRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
});

export default authRouter;
