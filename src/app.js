import express from "express";
import { userRoutes } from "./components/users/index.js";

const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
