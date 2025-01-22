
import Course from "../models/Course.model.js";

//TODO: COURSE FUNCTIONALITIES

export const createCourse=async(req,res)=>{
    const {courseName}=req.body;
    const course=await Course.create({courseName});
    res.status(201).json(course);
}

export const getCourses=async(req,res)=>{
    const courses=await Course.find();
    res.status(200).json(courses);
}

export const deleteCourse=async(req,res)=>{
    const {id}=req.params;
    await Course.findByIdAndDelete(id);
    res.status(200).json({message:"Course deleted successfully"});
}