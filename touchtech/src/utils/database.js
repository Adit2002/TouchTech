import mongoose from 'mongoose';

export const connectDB = async () =>{
    try{
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI,{
            dbname: "touchtechDB"
        });
        console.log("Mongoose connected");
    }catch(err){
        console.log(err);
    }
}