import { getAllCourses, getSingleCourse } from "../controllers/user.controller";
import express,{ Router } from "express";

const router : Router = express.Router()

router.get('/',getAllCourses)
router.get('/:courseId',getSingleCourse)


export default router