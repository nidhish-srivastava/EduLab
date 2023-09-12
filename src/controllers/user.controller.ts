import { Request, Response } from "express";
import { Course } from "../mongodb/model";

export const getAllCourses = async(req:Request,res : Response) =>{
    const response = await Course.find()
    res.json(response)
}

export const getSingleCourse = async(req:Request,res:Response)=>{
    const response = await Course.findById(req.params.id)
    res.json(response)
}