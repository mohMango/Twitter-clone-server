import app from "./src/app.js";
import dotenv from "dotenv";
import { createServer } from "http";

const PORT = process.env.PORT || 5000;

dotenv.config();

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`server run on port: ${PORT}`);
});
