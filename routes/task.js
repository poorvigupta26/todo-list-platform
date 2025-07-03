import express from "express";
import { allTasks, deleteTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { errorHandler } from "../middlewares/error.js";

const router = express.Router();

router.get("/all", isAuthenticated,allTasks);
router.post("/add", isAuthenticated, newTask);
router.route("/:id").put( isAuthenticated, updateTask).delete(isAuthenticated,deleteTask);

export default router;