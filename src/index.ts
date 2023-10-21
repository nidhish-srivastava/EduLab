import express,{Request,Response} from "express";
import cors from "cors";
import adminRouter from "./routes/admin.route";
import authRouter from "./routes/auth.route";
import userRouter from './routes/user.route'
import cartRouter from './routes/cart.route'
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connectmongodb } from "./mongodb/connect";
import { v2 as cloudinary } from "cloudinary";
const port = process.env.PORT || 4000
const corsOptions = {
  // origin: "https://edu-lab-ruddy.vercel.app",
  // origin: "http://localhost:5173",
  // credentials: true,
  //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const start = async() =>{
    connectmongodb()
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`);
    })
}

start()

app.get("/", (req:Request, res:Response) => {
  res.send(`Welcome to Edulab`);
});
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use('/user',userRouter)
app.use("/cart",cartRouter)

export default app;
