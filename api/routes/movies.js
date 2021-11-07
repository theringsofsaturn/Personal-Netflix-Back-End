import express from "express";
import Movie from "../models/Movie.js";
import verify from "../verifyToken.js";

const movieRouter = express.Router();

// ***************** CREATE *****************
movieRouter.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body); // new movie model with whate we got from the request
    try {
      // Save movie to database
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// ***************** UPDATE *****************
movieRouter.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      // Find movie by id that was sent in the request. After finding it, update it with the new data (set the new data in the body)
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } //remember to add this congifuration to get the updated data, if not, it will return the old data
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// ***************** DELETE *****************
movieRouter.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// ***************** GET MOVIE *****************
movieRouter.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default movieRouter;
