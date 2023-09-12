import express,{ Router } from "express";

const router : Router = express.Router()

router.get('/')
router.get('/:courseId')


export default router