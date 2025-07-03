import express from "express";
import { getAllUsers, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

// userRouter.get("/all", getAllUsers); //admin-specfic???
userRouter.post("/new", register);
userRouter.post("/login", login)
userRouter.get("/myProfile", isAuthenticated, getMyProfile);
userRouter.get("/logout", logout);

export default userRouter;