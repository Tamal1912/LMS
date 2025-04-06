import express from 'express';
import { upvotePost,downvotePost } from '../controllers/postController.js';

const router = express.Router();

// Upvote a post
router.get('/upvote/:postId',upvotePost);;

// Downvote a post
router.get('/:postId/downvote', downvotePost);

export default router;