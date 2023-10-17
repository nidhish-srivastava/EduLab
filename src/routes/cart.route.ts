import express,{  Router } from "express";
const router : Router = express.Router()
import { authenticateJwt } from "../middleware/auth";
import { purchase,remove,getCartItems,checkCourseInCart, cartItemsLength } from "../controllers/cart.controller";

router.get('/',getCartItems)
router.get('/cartItemsLength/:username',cartItemsLength)
router.get('/:courseId/:username',checkCourseInCart)
router.post('/:courseId',authenticateJwt,purchase)
router.delete('/:courseId',authenticateJwt,remove)

export default router

