import express from "express";
import { userRoutes } from "./components/users/index.js";
import { tweetRoutes } from "./components/tweets/index.js";

export const app = express();

app.use(express.json());

app.use("/", userRoutes);
app.use("/tweets", tweetRoutes);

app.get("/", (req, res) => {
  res.send("hello world\n");
});
