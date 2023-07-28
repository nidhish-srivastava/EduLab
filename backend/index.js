const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const businessRouter = require("./routes/business")
const supportRouter = require("./routes/support")
const universityRouter = require("./routes/university")
const cartRouter = require("./routes/cart")
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser())
app.use('/images',express.static(__dirname + '/images'))


const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    app.listen(3000, () => console.log('Server running on port 3000'));
}
start()

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/business",businessRouter)
app.use('/support',supportRouter)
app.use('/university',universityRouter)
app.use('/cart',cartRouter)