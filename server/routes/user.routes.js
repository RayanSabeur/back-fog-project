import express from "express";
import { signUp, signIn, logout} from "../controllers/auth.js";
import { getAllUsers, userInfo } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', signUp );
router.post('/login', signIn);
router.get('/logout', logout);
router.get("/all", getAllUsers);
router.get('/:id', userInfo);
// router.get("/" , getUserParams);

export default router;