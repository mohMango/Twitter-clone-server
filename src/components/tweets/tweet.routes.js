import express from "express";
import { create, feed, tweet } from "./tweet.controller.js";
import { auth } from "./../users/index.js";

export const tweetRoutes = express.Router();

tweetRoutes.post("/post", auth, create);
tweetRoutes.get("/feed", auth, feed);
tweetRoutes.get("/feed/:tweetId", auth, tweet);
