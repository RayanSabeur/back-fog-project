import express from "express";
// import { signIn } from "../controllers/auth.js";
import { addtofavorite, addtothepodium, commentGame, commentPost, createGameProduct, deleteCommentGame, deleteCommentPost, deleteGameProduct, editCommentGame, editCommentPost, gameInfo, getAllCommentsOfGame, readGameProduct, removefromthepodium, unlikePost, updateGame } from "../controllers/gameProduct.controller.js";
import { isAuthenticatedUser, setRoles } from "../middleware/auth.middleware.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as url from 'url';


const __dirname = url.fileURLToPath(new URL('../../', import.meta.url));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const router = express.Router();
const rootDir =  __dirname
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, rootDir + '/client/public/uploads/games/');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })

  const upload = multer({ storage: storage })

// const upload = multer()

router.post('/', isAuthenticatedUser, upload.array('files'), createGameProduct); //<---

router.get('/',  readGameProduct);
router.patch('/commentgame/:id', isAuthenticatedUser, commentGame);
router.get('/allcomments/:id', getAllCommentsOfGame)
router.delete('/:id',isAuthenticatedUser, setRoles("admin"), deleteGameProduct); //<---
router.put('/:id',isAuthenticatedUser, setRoles("admin"), upload.array('files'), updateGame);//<---
router.patch('/addtofavorite/:id', addtofavorite);
router.get('/details/:id', gameInfo);
router.patch('/unlikegame/:id', unlikePost);
router.patch('/addtothepodium/:id',isAuthenticatedUser,addtothepodium);
router.patch('/removefromthepodium/:id',isAuthenticatedUser, removefromthepodium)


router.put('/edit-comment-game/:id',isAuthenticatedUser, editCommentGame);
router.patch('/delete-commentgame/:id',isAuthenticatedUser, deleteCommentGame);



// router.patch('/like-post/:id', postController.likePost);
// router.patch('/unlike-post/:id', postController.unlikePost);



// comments

router.patch('/comment-post/:id', commentPost);
router.patch('/edit-comment-post/:id', editCommentPost);
router.patch('/delete-comment-post/:id', deleteCommentPost);

export default router;