import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: "String", required: true },
  desc: { type: "String" },
  img: { type: "String" },
  imgTitle: { type: "String" },
  imgSm: { type: "String" },
  trailer: { type: "String" },
  video: { type: "String" },
  year: { type: "String" },
  limit: { type: "String" },
  genre: { type: "String" },
  series: { type: Boolean, required: false },
});

model.exports = mongoose.model("Movie", MovieSchema);
