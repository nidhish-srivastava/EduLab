import { authenticateJwt } from "../middleware/auth";
import { createCourse, deleteCourse, findAuthorsCourses, updateCourse } from "../controllers/admin.controller";
import express,{ Router } from "express";

const router : Router = express.Router()

router.post('/',createCourse)
router.get('/:username',findAuthorsCourses)
router.patch('/:courseId',authenticateJwt,updateCourse)
router.delete('/:courseId',authenticateJwt,deleteCourse)


export default router