import express from "express";
import {
  create,
  feed,
  like,
  likes,
  tweet,
  update,
} from "./tweet.controller.js";
import { auth } from "./../users/index.js";

export const tweetRoutes = express.Router();

tweetRoutes.post("/post", auth, create);
tweetRoutes.get("/feed", auth, feed);
tweetRoutes.get("/feed/:tweetId", auth, tweet);
tweetRoutes.put("/:tweetId/update", auth, update);
tweetRoutes.post("/:tweetId/like", auth, like);
tweetRoutes.get("/:tweetId/likes", auth, likes);
