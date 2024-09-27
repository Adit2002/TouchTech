import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database'; // Adjust the import path if necessary
import User from '@/models/user'; // Adjust the import path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for GET request
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDB();

      // Fetch the user data (replace with the appropriate query if needed)
      const users = await User.find(); // You can modify the query based on your requirements

      // Map the users to extract wallpapers
      const wallpapers = users.flatMap(user =>
        user.customwallpaper.map(wallpaper => ({
          imageURI: wallpaper.imageURI,
          imageName: wallpaper.imageName,
        }))
      );

      // Return the wallpapers in the response
      res.status(200).json(wallpapers);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}