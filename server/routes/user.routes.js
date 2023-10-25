import express from "express";
import { signUp, signIn, logout} from "../controllers/auth.js";
import { deleteFavoris, editStatusfavorite, friendUser, gameCommentsUser, getAllUsers, getUserParams, uploadProfil, userInfo } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post('/register', signUp );
router.post('/login', signIn);
router.get('/logout', logout);

router.get("/friend/:userId", friendUser);
router.get("/" ,getUserParams);
router.get("/all", getAllUsers);
router.get('/:id', userInfo);
router.patch('/change-status/:id',isAuthenticatedUser, editStatusfavorite);
router.patch('/delete-favoris/:id',isAuthenticatedUser, deleteFavoris);
router.get('/allcomments/:id', gameCommentsUser)

// router.get("/" , getUserParams);

router.post("/upload", upload.single("file"), uploadProfil);
export default router;