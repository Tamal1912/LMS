import { asyncHandler } from "../utils/asyncHandler.js";
import Course from "../models/Course.model.js";

export const createCourse =asyncHandler(async (req, res) => {
    try {
        const {courseName,courseDescription,courseOutcome,courseContent,createdBy,assignments}=req.body;
        const course=await Course.create({courseName,courseDescription,courseOutcome,courseContent,createdBy,assignments});
        await course.save();
        res.status(201).json(ApiResponse.success(course,"Course created successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))

    }
})

export const deleteCourse =asyncHandler(async (req, res) => {
    try {
        const {courseId}=req.params;
        const course=await Course.findByIdAndDelete(courseId);
        if(!course) return res.status(404).json(ApiResponse.error("Course not found"))
        await course.save();
        res.status(200).json(ApiResponse.success(course,"Course deleted successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))
    }
}) ;

export const updateCourse =asyncHandler(async (req, res) => {
    try {
        const {courseId}=req.params;
        const {courseName,courseDescription,courseOutcome,courseContent,assignments}=req.body;
        const course=await Course.findByIdAndUpdate(courseId,{courseName,courseDescription,courseOutcome,courseContent,assignments});
        if(!course) return res.status(404).json(ApiResponse.error("Course not found"))
        await course.save();
        res.status(200).json(ApiResponse.success(course,"Course updated successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))
    }
})  

export const getAllCourse =asyncHandler(async (req, res) => {
    try {
        const courses=await Course.find();
        res.status(200).json(ApiResponse.success(courses,"Courses fetched successfully"))

    } catch (error) {
        console.log(error);
        res.status(500).json(asyncHandler(error))
    }
})

