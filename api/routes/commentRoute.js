import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment, getcomments, likeComment, postComments } from '../controllers/commentController.js';

const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/postcomments/:postId',postComments);
router.put('/likecomment/:commentId',verifyToken,likeComment)
router.put('/editcomment/:commentId',verifyToken,editComment)
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)
router.get('/getcomments',verifyToken,getcomments)

export default router;