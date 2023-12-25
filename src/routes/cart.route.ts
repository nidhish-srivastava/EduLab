import express,{  Router } from "express";
const router : Router = express.Router()
import { authenticateJwt } from "../middleware/auth";
import { addToCart,remove,getCartItems,checkCourseInCart, cartCheck } from "../controllers/cart.controller";

router.get('/:username',getCartItems)
router.get('/cartCheck/:username',cartCheck)
router.get('/:courseId/:username',checkCourseInCart)
router.post('/:courseId',authenticateJwt,addToCart)
router.delete('/:courseId',authenticateJwt,remove)

export default router

