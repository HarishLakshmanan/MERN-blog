import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { createComment, likeComment, postComments } from '../controllers/commentController.js';

const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/postcomments/:postId',postComments);
router.put('/likecomment/:commentId',verifyToken,likeComment)

export default router;