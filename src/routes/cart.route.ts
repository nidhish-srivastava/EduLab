import express,{  Router } from "express";
const router : Router = express.Router()
import { authenticateJwt } from "../middleware/auth";
import { purchase,remove,getCartItems } from "../controllers/cart.controller";

router.get('/',getCartItems)
router.post('/:courseId',authenticateJwt,purchase)
router.delete('/:courseId',authenticateJwt,remove)

export default router