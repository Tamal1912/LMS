import express from 'express';
import { upvotePost,downvotePost } from '../controllers/postController.js';

const router = express.Router();

// Upvote a post
router.post('/upvote/:postId',upvotePost);;

// Downvote a post
router.post('/downvote/:postId', downvotePost);

export default router;