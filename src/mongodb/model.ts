import mongoose, { Schema, model, Types } from "mongoose";

type courseType = {
  title: string;
  imageLink : string;
  description: string;
  price : number | string
  _id?: number;
  author?: string;
};

interface iAuth {
  username: string;
  password: string;
  boughtCourses : string[]
}

interface iCourse {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  author: string;
}

interface iBusinessRegister {
  firstName: string;
  lastName: string;
  workEmail: string;
  mobileNumber: number;
  companyName: string;
  jobLevel: string;
  country: string;
  companySize: string;
}

interface iUniversityRegister {
  firstName: string;
  lastName: string;
  workEmail: string;
  mobileNumber: number;
  institutionName: string;
  jobLevel: string;
  country: string;
  department: string;
}

interface iCart {
  username: string;
  courses: {
    quantity?: number;
    course: string;
  }[];
}

interface iSupport {
  problem: string;
  username: string;
}

const authSchema = new Schema<iAuth>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  boughtCourses : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},{timestamps : true});

const courseSchema = new Schema<iCourse>({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
},{timestamps : true});

const cartSchema = new Schema<iCart>({
  username: { type: String, required: true },
  courses: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      quantity: { type: Number, default: 0 },
    },
  ],
},{timestamps : true});

// const businessRegisterSchema = new Schema<iBusinessRegister>({});

// const supportSchema = new Schema<iSupport>({});

// const universityRegisterSchema = new Schema<iUniversityRegister>({});

const Auth = model<iAuth>("Auth", authSchema);
const Course = model<iCourse>("Course", courseSchema);
const Cart = model<iCart>("Cart", cartSchema);

export { Auth, Course, Cart};
