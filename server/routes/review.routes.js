import express from "express";
import { addtofavorite, commentReview, createReview, deleteCommentReview, deleteReview, editCommentReview, getUserReview, readReview, unlikePost, updateReview } from "../controllers/review.Controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/', isAuthenticatedUser, createReview);
router.get('/all',  readReview);
router.get('/:id', getUserReview)

router.delete('/:id',isAuthenticatedUser, deleteReview);
router.put('/:id',isAuthenticatedUser, updateReview);

router.patch('/addtofavorite/:id',isAuthenticatedUser, addtofavorite);
router.patch('/unlikereview/:id',isAuthenticatedUser, unlikePost);

router.patch('/comment-review/:id',isAuthenticatedUser, commentReview);
router.patch('/edit-comment-review/:id',isAuthenticatedUser, editCommentReview);
router.patch('/delete-comment-review/:id',isAuthenticatedUser, deleteCommentReview);

export default router;