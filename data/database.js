import mongoose from "mongoose";

export const connectDb =()=>{ mongoose.connect("mongodb://localhost:27017/",{
    dbName:"TodoList"
}).then(()=>{
    console.log("db connected");
}
).catch((e)=>{
    console.log(e)
})}