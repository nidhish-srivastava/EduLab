import express,{  Router } from "express";
const router : Router = express.Router()
import { authenticateJwt } from "../middleware/auth";
import { purchase } from "../controllers/cart.controller";

router.post('/:courseId',authenticateJwt,purchase)
router.delete('/:courseId',authenticateJwt)

export default router