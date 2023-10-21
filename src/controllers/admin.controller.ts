import { Request, Response } from "express";
import uploadImage from "../UploadImage";
import { Course } from "../mongodb/model";
type NanoidFunction = () => string;
let imageId: string;
import("nanoid")
  .then((module) => {
    const nanoid: unknown = module.default; // Get the default export from the module
    if (typeof nanoid === "function") {
      imageId = (nanoid as NanoidFunction)().split("-")[0];
    } else {
      // Handle the case where 'nanoid' is not a function
    }
    // Continue using imageId and any other code that depends on nanoid
  })
  .catch((error) => {
    // Handle any import error here
  });

const uploadImagePromise = async (
  imageLink: string,
  imageId: string
): Promise<any> => {
  try {
    const imageUrl = await uploadImage(imageLink, imageId);
    return imageUrl;
  } catch (error) {
  }
};

const createCoursePromise = async(title:string,description:string,price:number,author:string,imageUrl:string) : Promise<any>=>{
  try {
    const create = new Course({
       title : title,
       description : description,
       price : price,
       author : author,
       imageLink : imageUrl
    })
    return await create.save()
  } catch (error) {
  }
}

export const createCourse = async (req: Request, res: Response) => {
  const {title,description,price,author,imageLink} = req.body
  try {
    const imageUrl = await uploadImagePromise(imageLink, imageId);
    await createCoursePromise(title,description,price,author,imageUrl)
    res.status(201).send(`Course created successfully`)
  } catch (error) {
    res.status(400).send(`Error while creating`)
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { updateFormData } = req.body;
  // console.log(updateFormData);
  // await Course.updateOne({ _id: req.params.courseId }, bodyContent);
  // res.send(`Course updated successfully`);
};

export const deleteCourse = async (req: Request, res: Response) => {
  await Course.findByIdAndDelete(req.params.courseId);
  res.send(`Course Deleted successfully`);
};

export const findAuthorsCourses = async (req: Request, res: Response) => {
  const find = await Course.find({ author: req.params.username });
  res.status(200).json(find)
};

