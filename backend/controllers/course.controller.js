import { asyncHandler } from "../utils/asyncHandler.js";
import Course from "../models/Course.model.js";
import cloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponses.js";
import { ApiError } from "../utils/ApiError.js";
import Student from "../models/Student.model.js";
import Teacher from "../models/Teacher.model.js";

export const createCourse = asyncHandler(async (req, res) => {
    try {
        const courseOwner = req.user._id; // Get teacher ID
        const { courseName, courseDescription, courseContent, courseOutcome, courseCategory, courseImage } = req.body;

        if (!courseContent) {
            throw new ApiError(400, "Video file is required");
        }

        // Upload to Cloudinary
        const videoUploadResponse = await cloudinary.uploader.upload(courseContent, {
            resource_type: "video",
            folder: "course_videos"
        });


        let courseImageUploadResponse;
        if (courseImage) {
            courseImageUploadResponse = await cloudinary.uploader.upload(courseImage, {
                resource_type: "image",
                folder: "course_images"
            });
        }

        // Create the course
        const course = await Course.create({
            courseOwner,
            courseName,
            courseDescription,
            courseOutcome,
            courseContent: videoUploadResponse.secure_url,
            courseCategory,
            courseImage: courseImageUploadResponse.secure_url,
        });

        // Update teacher's courses array
        const teacher = await Teacher.findById(courseOwner);
        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        teacher.courses.push(course._id);
        await teacher.save();

        // Fetch the updated course with populated fields
        const populatedCourse = await Course.findById(course._id)
            .populate('courseOwner', 'username email');

        console.log("Course created and linked to teacher:", {
            courseId: course._id,
            teacherId: courseOwner,
            teacherCourses: teacher.courses
        });

        res.status(201).json(
            new ApiResponse(200, populatedCourse, "Course created successfully")
        );

    } catch (error) {
        console.error("Error creating course:", error);
        throw new ApiError(500, "Failed to create course");
    }
});


  export const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    await Course.findByIdAndDelete(courseId);
    
    return res.status(200).json(
        new ApiResponse(200, null, "Course deleted successfully")
    );
});
 

export const updateCourse =asyncHandler(async (req, res) => {
    try {
        const {courseId}=req.params;
        const {courseName,courseDescription,courseOutcome,courseContent}=req.body;
        const course=await Course.findByIdAndUpdate(courseId,{courseName,courseDescription,courseOutcome,courseContent,assignments});
        if(!course) throw new ApiError(404,"Course not found")
        await course.save();
        res.status(200).json(new ApiResponse(200,course,"Course updated successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Failed to update course")
    }
})  



export const watchCourse = asyncHandler(async (req, res) => {
    
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        console.log("watching course");
        res.status(200).json(new ApiResponse(200,course,"Course fetched successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Failed to Fetch course")
    }
})



export const getTeacherCourses = asyncHandler(async (req, res) => {
    try {
        const teacherId = req.user._id;
        console.log("Fetching teacher courses for:", teacherId);
        
        
        // Find the teacher and populate their courses
        const teacher = await Teacher.findById(teacherId)
            .populate({
                path: 'courses',
            });

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        console.log("Found teacher courses:", teacher.courses);

        return res.status(200).json(
            new ApiResponse(200, teacher.courses, "Courses fetched successfully")
        );

    } catch (error) {
        console.error("Error fetching teacher courses:", error);
        throw new ApiError(500, "Failed to fetch teacher courses");
    }
});

export const enrollInCourse = asyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    // Check if the student is already enrolled
    if (course.students.includes(studentId)) {
      return res.status(400).json(
        new ApiResponse(400, null, "Student is already enrolled in this course")
      );
    }

    // Add the student to the course
    course.students.push(studentId);
    await course.save();

    // Add the course to the student's enrolledCourses array
    const student = await Student.findById(studentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    student.enrolledCourses.push(courseId);
    await student.save();
   

    //add the student to Teachers enrolledStudents array
    const teacher = await Teacher.findById(course.courseOwner);
    if (!teacher) {
      throw new ApiError(404, "Teacher not found");
    }
    teacher.enrolledStudents.push(studentId);
    await teacher.save();


    return res.status(200).json(
      new ApiResponse(200, course, "Enrolled in course successfully")
    );
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw new ApiError(500, "Failed to enroll in course");
  }
});

