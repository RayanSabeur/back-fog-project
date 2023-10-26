import express from "express";
import { addtofavorite, commentPostReview, commentReview, createReview, deleteCommentPostReview, deleteCommentReview, deleteReview, editCommentPostReview, editCommentReview, getAllCommentsOfReview, getCurrentReview, getUserReview, readReview, unlikePost, updateReview } from "../controllers/review.Controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
const router = express.Router();
import * as url from 'url';
import multer from "multer";
const __dirname = url.fileURLToPath(new URL('../../', import.meta.url));

const rootDir =  __dirname
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, rootDir + '/client/public/uploads/reviews/');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })

  const upload = multer({ storage: storage })

router.post('/',  upload.array('files'), createReview);
router.get('/all',  readReview);
router.get('/:id', getUserReview)
router.get('/currentreview/:id', getCurrentReview)

router.delete('/:id',isAuthenticatedUser, deleteReview);
router.put('/:id',isAuthenticatedUser,upload.array('files'), updateReview);
router.get('/allcomments/:id', getAllCommentsOfReview)
router.patch('/addtofavorite/:id',isAuthenticatedUser, addtofavorite);
router.patch('/unlikereview/:id',isAuthenticatedUser, unlikePost);

router.patch('/comment-review/:id',isAuthenticatedUser, commentReview);
router.put('/edit-comment-review/:id',isAuthenticatedUser, editCommentReview);
router.patch('/delete-comment-review/:id',isAuthenticatedUser, deleteCommentReview);


router.patch('/comment-post-review/:id', commentPostReview);
router.patch('/edit-comment-post-review/:id', editCommentPostReview);
router.patch('/delete-comment-post-review/:id', deleteCommentPostReview);

export default router;