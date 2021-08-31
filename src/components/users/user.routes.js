import express from "express";
import { login, register } from "./user.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/auth/login", login);
userRoutes.post("/auth/register", register);
