import { Request, Response } from "express";
import uploadImage from "../UploadImage";
import { nanoid } from "nanoid";
import { Course } from "../mongodb/model";


const uploadImagePromise = async (dp : string, imageId : string) : Promise<any> => {
    // console.log("uplpoad image");
    try {
        const imageUrl = await uploadImage(dp, imageId)
        return imageUrl
    }
    catch (error) {
        console.log(error)
    }
}

export const createCourse = async(req : Request,res:Response) =>{
    const {title,description,price,author,category,image} = req.body
    const imageId = nanoid().split('-')[0]
    try {
        const imageUrl = await uploadImagePromise(image,imageId)
        const create = await Course.create({
            title,
            description,
            price,
            imageLink : imageUrl,
            author,
            category : category
        })
        await Promise.all([imageUrl,create])
        res.send(`Course created successfully`)
    } catch (error) {

    }
}

export const updateCourse = async(req : Request,res : Response) =>{
    const {bodyContent} = req.body
    await Course.updateOne({_id : req.params.courseId},bodyContent)
    res.send(`Course updated successfully`)
}

export const deleteCourse = async(req : Request,res : Response) =>{
    await Course.findByIdAndDelete(req.params.courseId)
    res.send(`Course Deleted successfully`)
}

export const findAuthorsCourses = async(req:Request,res : Response) =>{
    const find = await Course.find({author : req.params.username})
    res.json(find)
}