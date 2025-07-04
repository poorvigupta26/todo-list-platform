import { app } from "./app.js";
import { connectDb } from "./data/database.js";


connectDb();

app.listen(process.env.PORT, ()=>{
    console.log(`server has started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})