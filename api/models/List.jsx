import mongoose, { model } from "mongoose";

const ListSchema = mongoose.Schema(
  {
    title: { type: "String", required: true, unique: true },
    type: { type: "String" },
    genre: { type: "String" },
    content: { type: "Array" },
  },
  { timestamps: true }
);

model.exports = mongoose.model("List", ListSchema);
