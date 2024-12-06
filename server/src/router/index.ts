import { Router } from "express";
// import { addHandler, getAllHandler, getByIndexHandler, deleteHandler, updateHandler } from "./controller"
// import { loginHandler, authHanlder, voteHandler, signUpHandler, getPolicyHandler, addPolicyHandler, getCategoryHandler } from '../controller/index'
import { signInHandler,signUpHandler } from "../controller/user";
import { verifyToken } from '../controller/public'
import diaryRoutes from './diary'

const router = Router();

router.get("/", () => { console.log("success") })
router.post("/signin", signInHandler)
router.post("/signup", signUpHandler)
router.get("/test", verifyToken, (req, res, next) => next(200))

router.use("/diary", diaryRoutes);


export default router;