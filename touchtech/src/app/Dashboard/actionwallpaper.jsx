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
    return null; 
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
}
