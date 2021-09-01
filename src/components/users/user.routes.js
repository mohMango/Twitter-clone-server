import express from "express";
import {
  follow,
  followers,
  following,
  login,
  register,
} from "./user.controller.js";
import { auth } from "./user.middleware.js";

export const userRoutes = express.Router();

userRoutes.post("/auth/login", login);
userRoutes.post("/auth/register", register);

userRoutes.post("/user/follow", auth, follow);
userRoutes.get("/user/following", auth, following);
userRoutes.get("/user/followers", auth, followers);
