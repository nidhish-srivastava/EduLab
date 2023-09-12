import app from "./index";
import { connectmongodb } from "./mongodb/connect";
const port = process.env.PORT || 4000

const start = async() =>{
    connectmongodb()
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`);
    })
}

start()