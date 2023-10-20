import express,{  Router } from "express";
const router : Router = express.Router()
import { authenticateJwt } from "../middleware/auth";
import { purchase,remove,getCartItems,checkCourseInCart, cartCheck } from "../controllers/cart.controller";

router.get('/',getCartItems)
router.get('/cartCheck/:username',cartCheck)
router.get('/:courseId/:username',checkCourseInCart)
router.post('/:courseId',authenticateJwt,purchase)
router.delete('/:courseId',authenticateJwt,remove)

export default router

