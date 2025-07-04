import mongoose from "mongoose";

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

export const Task = mongoose.model("Task", schema);