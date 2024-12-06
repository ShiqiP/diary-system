import { Router } from "express";
// import { addHandler, getAllHandler, getByIndexHandler, deleteHandler, updateHandler } from "./controller"
// import { loginHandler, authHanlder, voteHandler, signUpHandler, getPolicyHandler, addPolicyHandler, getCategoryHandler } from '../controller/index'
import { signInHandler } from "../controller/user";
import { verifyToken } from '../controller/public'

const router = Router();

router.get("/", () => { console.log("success") })
router.post("/login", signInHandler)
router.get("/test", verifyToken, (req,res,next) => next(200))


export default router;