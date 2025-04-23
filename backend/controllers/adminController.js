import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import Post from '../models/Post.model.js';
import Course from '../models/Course.model.js';

export const trackAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find().sort({createdAt: -1})
        return res.status(200).json({students});
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch students");
    }
});

export const getAllTeachers = asyncHandler(async (req, res) => {
    try {
        const teachers= await Teacher.find().sort({createdAt: -1})
        return res.status(200).json({teachers});    
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch teachers");
    }
});

export const getAllPosts= asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        return res.status(200).json({posts});
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch posts");
    }
});

export const getAllCourses= asyncHandler(async (req, res) => {
    try {
        
        const courses = await Course.find().sort({createdAt: -1})
        return res.status(200).json({courses});
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch courses");
    }
})

export const deletePost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to delete post");
    }

});

export const viewPost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('author', 'name email').populate( 'title');
        if (!post) {
            throw new ApiError(404, "Post not found");
        }
        return res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch post");
    }
});

export const deleteTeacher = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId);
        
        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }
        
        // Delete all courses created by this teacher
        await Course.deleteMany({ courseOwner: teacherId });
        
        // Delete all posts created by this teacher
        await Post.deleteMany({ author: teacherId });
        
        // Delete the teacher
        await Teacher.findByIdAndDelete(teacherId);
        
        return res.status(200).json({ message: "Teacher and all associated content deleted successfully" });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to delete teacher");
    }
});

export const deleteCourse = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        
        // Remove course from teacher's courses array
        await Teacher.updateOne(
            { _id: course.courseOwner },
            { $pull: { courses: courseId } }
        );
        
        // Remove course from students' enrolledCourses array
        await Student.updateMany(
            { enrolledCourses: courseId },
            { $pull: { enrolledCourses: courseId } }
        );
        
        // Delete the course
        await Course.findByIdAndDelete(courseId);
        
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to delete course");
    }
});
