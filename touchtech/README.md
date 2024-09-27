# Wallpaper Changer

A dynamic wallpaper changer application where users can log in using Google OAuth and select wallpapers from a list stored in AWS S3. 
The image metadata (such as image names and S3 URIs) is stored in MongoDB, and the wallpapers are fetched dynamically from there.

## Features

- **Google OAuth Authentication:** Users can log in using their Google account for a seamless and secure experience.
- **AWS S3 Storage:** Wallpapers are stored in AWS S3 and fetched in real-time for user selection.
- **MongoDB for Metadata Storage:** Image names and S3 URIs are saved in MongoDB for easy retrieval.
- **Tailwind CSS for Styling:** A modern and responsive UI built with Tailwind CSS.

## Technologies Used

- **Next.js**: For building the server-side rendered web application.
- **Google OAuth**: For secure user authentication.
- **AWS S3**: For storing and retrieving wallpaper images.
- **MongoDB**: For storing image metadata.
- **Tailwind CSS**: For modern and responsive UI design.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Aditya2002/touchtech.git
   cd touchtech 
2. **Install Dependencies:**
   ```bash
    npm install
3. **Set Up Enviornment Variables **
4. **Run**
   ```bash
   npm run dev 
