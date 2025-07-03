import ErrorHandler from "../utils/ErrorHandler.js";
import { Task } from "../models/task.js";

export const newTask= async(req, res, next)=>{
   try {
    const{title, desc} = req.body;
    const task = await Task.create({
        title,
        desc,
        userId: req.user,
    })
    res.send("created")
   } catch (error) {
    next(error);
   }

}

export const allTasks=async(req, res, next)=>{
   try {
    const user_id = req.user._id;
    const task = await Task.find({userId:user_id});
    res.status(200).json({
        success:true,
        task
    })
   } catch (error) {
    next(error);
   }
}

export const updateTask=async (req, res, next)=>{
    try {
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task){
        return next(new Error("Task does not exist"))
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message:"task updated"
    }); 
    } catch (error) {
        next(error);
    }
}

export const deleteTask=async (req, res, next)=>{
    try {
        const{id} = req.params;
        const task = await Task.findById(id);
        if(!task){
            return next(new ErrorHandler("Task Not Found :("));
        }
        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"task deleted"
        })

    } catch (error) {
        next(error);
    }
    
}