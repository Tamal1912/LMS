import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
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

},{timestamps:true})

const Course=mongoose.model("Course",courseSchema)
export default Course;
    
