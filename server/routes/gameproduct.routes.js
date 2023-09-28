import express from "express";
// import { signIn } from "../controllers/auth.js";
import { addtofavorite, addtothepodium, commentGame, createGameProduct, deleteCommentGame, deleteGameProduct, editCommentGame, readGameProduct, removefromthepodium, unlikePost, updateGame } from "../controllers/gameProduct.controller.js";
import { isAuthenticatedUser, setRoles } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/', isAuthenticatedUser, setRoles("admin"), createGameProduct);
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