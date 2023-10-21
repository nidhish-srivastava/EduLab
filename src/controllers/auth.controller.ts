import { Auth } from "../mongodb/model";
import express,{ NextFunction, Request, Response,Router } from "express";
import bcrypt, { hashSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { log } from "console";
dotenv.config()


const router : Router = express.Router()

export const getProfile =  async (req : Request, res : Response) => {
    const admin = await Auth.findOne({username : req.user.username})
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }

    res.json({username : admin.username})
}

export const signup =async(req:Request,res : Response)=>{
    const {username,password} = req.body
    const check = await Auth.findOne({username})
    if(check){
        res.status(403).json({ message: "User already exists" })
    }

    const newUser = new Auth({username : username,password : hashSync(password)})
    await newUser.save()
    const token = jwt.sign({username : username},process.env.SECRET || "",{expiresIn : "1h"})
    res.json({msg : "User created Successfully",token})
}

export const login =async(req:Request,res : Response)=>{
    const {username,password} = req.body
    const admin = await Auth.findOne({username})
    if (admin) {
        bcrypt.compare(password, admin?.password, function (err, info) {
            if (err)  res.status(500).json("Server error")
            if (info) {
                const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET || "", { expiresIn: '1h' })
                res.json({ message: 'Logged in successfully', token, admin });
            }
            else{
                res.status(400).json({message : "Password not matching"})
            }
        })
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}

export const buyCourse = async(req:Request,res:Response)=>{
    const {courseId,username} = req.body

    try {
    // const findUser = await Auth.findOne({username : username})
    // findUser?.boughtCourses.push(courseId)
    // await findUser?.save()

    // Using mongoose operators
          const updatedUser = await Auth.findOneAndUpdate(
            { username: username },
            { $addToSet: { boughtCourses: courseId } },
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }

          if(updatedUser.boughtCourses.includes(courseId)){
            return res.status(400).json({message : "Course already bought"})
          }
      
          res.status(201).json({ message: 'Course bought successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      
  }

export const fetchBoughtCourses = async(req:Request,res:Response)=>{
    try {
        const courses = await Auth.findOne({username : req.params.username}).populate({
            path : "boughtCourses",
            select : "price author title description price imageLink",
            model : "Course",
        })
        res.json(courses?.boughtCourses);
    } catch (error) {
        
    }
}

export const checkIfCourseBought = async(req:Request,res:Response)=>{
    const {username,courseId} = req.body
    try {
    const findUser = await Auth.findOne({username : username})
    if(findUser?.boughtCourses.includes(courseId)){
       return res.status(400).json({message : "Course already bought"})
    }
    else res.status(200).json({message : "Proceed"})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default router