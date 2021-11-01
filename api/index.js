import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = 3001;
const server = express();

// mongoose getting-started.js
main().catch(err => console.log(err))

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

server.listen(port, () => {
  console.log("🧡 server is running on port: " + port);
});
