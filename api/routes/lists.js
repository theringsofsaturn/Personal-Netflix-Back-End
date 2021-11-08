import express from "express";
import Movie from "../models/Movie.js";
import verify from "../verifyToken.js";

const listsRouter = express.Router();

// ***************** CREATE *****************
listsRouter.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });


export default listsRouter;
