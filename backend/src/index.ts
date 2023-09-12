import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.route";
import authRouter from "./routes/auth.route";
import userRouter from './routes/user.route'
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/", (req, res) => {
  res.send(`Welcome to Edulab`);
});
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use('/user',userRouter)

export default app;
