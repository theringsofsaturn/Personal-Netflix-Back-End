import express from "express";
import Movie from "../models/Movie.js";
import verify from "../verifyToken.js";

const movieRouter = express.Router();

// ***************** CREATE *****************
movieRouter.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body); // new movie model with whate we got from the request
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});



export default movieRouter;
