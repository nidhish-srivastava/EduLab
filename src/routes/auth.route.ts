import express, { Router } from 'express'
import { authenticateJwt } from '../middleware/auth'
import { buyCourse, checkIfCourseBought, fetchBoughtCourses, getProfile, login, signup } from '../controllers/auth.controller'
import { checkCourseInCart } from 'controllers/cart.controller'
const router : Router = express.Router()

router.get('/me',authenticateJwt,getProfile)
router.post('/login',login)
router.post('/signup',signup)
router.post('/buy-course',buyCourse)
router.get('/fetchBoughtCourses/:username',fetchBoughtCourses)
router.get('/checkIfBought/:username/:courseId',checkIfCourseBought)
export default router