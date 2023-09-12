import { Schema, model, Types } from "mongoose";

interface iAuth {
  username: string;
  password: string;
}

interface iCourse {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  //   published : boolean
  category: string;
  author: string;
  //   authId : Types.ObjectId
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
});

const courseSchema = new Schema<iCourse>({
  // authId : {type : Schema.Types.ObjectId,ref : "Auth",required : true},
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
  // published : {type : Boolean},
  category: { type: String, required: true },
});

const cartSchema = new Schema<iCart>({
  username: { type: String, required: true },
  courses: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      quantity: { type: Number, default: 0 },
    },
  ],
});

const businessRegisterSchema = new Schema<iBusinessRegister>({});

const supportSchema = new Schema<iSupport>({});

const universityRegisterSchema = new Schema<iUniversityRegister>({});

const Auth = model<iAuth>("Auth", authSchema);
const Course = model<iCourse>("Course", courseSchema);
const Cart = model<iCart>("Cart", cartSchema);

export { Auth, Course, Cart};
