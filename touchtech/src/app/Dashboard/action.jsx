'use server'
import { revalidatePath } from "next/cache";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
async function uploadFileToS3(file, fileName,Em){
    const fileBuffer = file;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}`,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    try{
        const response = await s3Client.send(command);
        const uri=`https://touchtech-assignment2.s3.amazonaws.com/${fileName}`;
        await connectDB();
        const updatedUser = await User.findOneAndUpdate(
            { email: Em },
            { $push: { customwallpaper: { imageName: fileName, imageURI: uri } } }, 
            { new: true } 
          );
      
          if (updatedUser) {
            console.log('User updated successfully:', updatedUser);
          } else {
            console.log('User not found');
          }
    }catch(err){
        console.log(err);
    }
}
export async function uploadFile(formData,Em){
    try{
        console.log(Em);
        const file = formData.get("file");
        if(file.size === 0){
            return {status: "error", message: "Please select a file" };
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        await uploadFileToS3(buffer,file.name,Em);
        revalidatePath('/');
        return {status: "Success", message: "File Uploaded"};
        }catch(err){
            console.log(err);
            return {status: "Failed", message: "File Upload Failed"}
        }
}