import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB  from "./db/dataBase.js";

dotenv.config({
    path:"./.env"
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`Server is listening on Port ${process.env.PORT}` )
    })

    app.on("error",(error)=>{
        console.log("error",error)
        throw error
    })
})
.catch((error)=>{
    console.log("Server failed to connect ",error)
})
