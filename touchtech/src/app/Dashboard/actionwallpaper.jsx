"use server";
import { connectDB } from "@/utils/database";
import User from "@/models/user";

export async function fetchUserWallpaperByEmail(email) {
  try {
    console.log(`Fetching wallpaper for email: ${email}`);
    await connectDB();
    
    const user = await User.findOne({ email });
    
    if (user) {
      return user.customwallpaper.toObject();
    }
    
    console.warn(`No user found with email: ${email}`);
    return null; // Or you could return an empty array/object depending on your use case
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null; // Consider throwing an error or returning a specific error message
  }
}
