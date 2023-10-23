import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery',true)
const connect = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("CONNECT SUCCESSFULLY");

    } catch (error) {
        console.log(error);
    }
}
export default connect