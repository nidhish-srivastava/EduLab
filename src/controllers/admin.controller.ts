import { Request, Response } from "express";
import uploadImage from "../UploadImage";
import { Course } from "../mongodb/model";
type NanoidFunction = () => string;
let imageId:string 
import('nanoid')
  .then((module) => {
    const nanoid : unknown = module.default; // Get the default export from the module
    if (typeof nanoid === 'function') {
        imageId = (nanoid as NanoidFunction)().split('-')[0];
      } else {
        // Handle the case where 'nanoid' is not a function
      }
    // Continue using imageId and any other code that depends on nanoid
  })
  .catch((error) => {
    // Handle any import error here
  });



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
    // const imageId = nanoid().split('-')[0]
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

export {
    
}