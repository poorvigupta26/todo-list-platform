import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
})

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true //if true,cookies and headers are sent to frontend 
}));

//custom routers
app.use("/users", userRouter);
app.use("/tasks",taskRouter);

app.get("/", (req, res)=>{
    // console.log(req.cookies)
    res.send("to do app");
})

//error middleware
app.use(errorHandler)