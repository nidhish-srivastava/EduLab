import { Request, Response } from "express";
import { Course } from "../mongodb/model";

interface ReqQuery {
    title ?: string
  }
  
  const cleanInput = (input: string) => {
    return new RegExp(
      input
        ?.trim()
        .replace(/\s{2,}/g, " ")
        .replace(/,(?!\s)/g, ", ")
        .toString()
        .toLowerCase(),
      "i"
    );
  };

export const getAllCourses = async(req:Request,res:Response) =>{
    const {title} = req.query as ReqQuery
    const queryObject  : Record<string,any> = {}
    if(title){
        queryObject.title = cleanInput(title)
    }
    try {
        const response = await Course.find(queryObject)
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: "Error is coming", error });
    }
    
}


export const getSingleCourse = async(req:Request,res:Response)=>{

    const response = await Course.findById(req.params.courseId)
    res.json(response)
}