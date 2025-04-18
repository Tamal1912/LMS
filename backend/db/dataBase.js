import mongoose from "mongoose";
import{ DB_name} from "../constant.js"

console.log(process.env.MONGODB_URI);

const connectDb=(async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        console.log("\n MongoDB connected !! DB Host : ",connection);
        
    } catch (error) {
        console.log(error?.message || "failed for mongodb connection");
        process.exit(1)
    }
})

export default connectDb 