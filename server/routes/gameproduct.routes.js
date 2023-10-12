import express from "express";
// import { signIn } from "../controllers/auth.js";
import { addtofavorite, addtothepodium, commentGame, createGameProduct, deleteCommentGame, deleteGameProduct, editCommentGame, readGameProduct, removefromthepodium, unlikePost, updateGame } from "../controllers/gameProduct.controller.js";
import { isAuthenticatedUser, setRoles } from "../middleware/auth.middleware.js";
import multer from "multer";
import { dirname } from 'path';
import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, __dirname + '/uploads');
//     },
//     // Sets file(s) to be saved in uploads folder in same directory
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
//     // Sets saved filename(s) to be original filename(s)
//   })

//   const upload = multer({ storage: storage })

const upload = multer()

router.post('/',isAuthenticatedUser, upload.single('file'), createGameProduct);
router.get('/',  readGameProduct);
router.patch('/comment-game/:id',isAuthenticatedUser, commentGame);
router.patch('/edit-comment-game/:id',isAuthenticatedUser, editCommentGame);
router.patch('/delete-comment-game/:id',isAuthenticatedUser, deleteCommentGame);

router.delete('/:id',isAuthenticatedUser, setRoles("admin"), deleteGameProduct);
router.put('/:id',isAuthenticatedUser, setRoles("admin"), updateGame);

router.patch('/addtofavorite/:id',isAuthenticatedUser, addtofavorite);
router.patch('/unlikegame/:id', unlikePost);
router.patch('/addtothepodium/:id',isAuthenticatedUser,addtothepodium);
router.patch('/removefromthepodium/:id',isAuthenticatedUser, removefromthepodium)

export default router;