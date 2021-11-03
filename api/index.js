import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints"
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"

dotenv.config();

const port = 3001;
const server = express();
server.use(express.json())

/* ************ENDPOINTS******************* */

server.use("/api/auth", authRouter)
server.use("/api/users", usersRouter)

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("🧡 server is running on port: " + port);
});
