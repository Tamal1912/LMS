import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    
    courseOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true
    },
    courseOutcome:{
        type:String,
        required:true
    },
  
    assignments:{
        type:String,
        required:true  
    },
    courseContent:{
        type:String,
        required:true
    },
    courseImage:{
        type:String,
        required:true
    },

},{timestamps:true})

const Course=mongoose.model("Course",courseSchema)
export default Course;
    
