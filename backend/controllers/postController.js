import Post from "../models/Post.model.js";
import Teacher from "../models/Teacher.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponses.js";

export const createPost = asyncHandler(async (req, res) => {
    try {

        const author = req.user._id;
        const { title, postBody, links, tags } = req.body;

        if (!title || !postBody) {
            throw new ApiError(400, "Title and post body are required");
        }

        const post = await Post.create({
            title,
            postBody,
            author,
            links,
            tags,
        });

        const teacher = await Teacher.findById(author);
        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }
        teacher.posts.push(post._id);
        await teacher.save();

        const populatedPost = await Post.findById(post._id)
            .populate('author', 'username email');

        res.status(201).json(
            new ApiResponse(200, populatedPost, "Post created successfully")
        );
    } catch (error) {
        console.error("Error creating post:", error);
        throw new ApiError(500, "Failed to create post");
    }

});

export const deletePost = asyncHandler(async (req, res) => {

    try {

        const { postId } = req.params;

        if (!postId || postId === "undefined") {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }
        const teacherId = req.user._id;


        const post = await Post.findById(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

    
        if (post.author.toString() !== teacherId.toString()) {
            throw new ApiError(403, "You are not authorized to delete this post");
        }

        
        await Post.findByIdAndDelete(postId);

     
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { $pull: { posts: postId } },
            { new: true }
        );

        console.log("Post deleted & teacher updated:", updatedTeacher);

        return res.status(200).json(
            new ApiResponse(200, null, "Post deleted successfully")
        );

    } catch (error) {
        console.error("Error deleting post:", error);
        throw new ApiError(500, "Failed to delete post");
    }
});


export const getTeacherPosts = asyncHandler(async (req, res) => {
    try {
        const teacherId = req.user._id;
        const teacher = await Teacher.findById(teacherId).populate('posts');
        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }
        const posts = teacher.posts.map(post => ({
            id: post._id,
            title: post.title,
            postBody: post.postBody,
            links: post.links,
            tags: post.tags,
            createdAt: post.createdAt,
        }));
        return res.status(200).json(
            new ApiResponse(200, posts, "Posts retrieved successfully")
        );
    } catch (error) {
        console.error("Error retrieving posts:", error);
        throw new ApiError(500, "Failed to retrieve posts");
    }
});