"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (session && typeof window !== 'undefined') {
      // Set localStorage when session is available
      localStorage.setItem("userProfile", JSON.stringify({
        email: session.user.email,
        name: session.user.name,
      }));

      // Update state variables from session
      setEmail(session.user.email);
      setName(session.user.name);
    } else {
      // Clear localStorage if there's no session
      localStorage.removeItem("userProfile");
      setEmail(null);
      setName(null);
    }
  }, [session]);

  // Load userProfile from localStorage when the component mounts
  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    if (storedUserProfile) {
      const userProfile = JSON.parse(storedUserProfile);
      setEmail(userProfile.email);
      setName(userProfile.name); 
    }
  }, [session]);

  return (
    <section className="min-h-screen bg-gray-100 text-gray-800 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to WallPaper Changing App
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        This application allows users to upload and change wallpapers, securely
        using Google OAuth for authentication, MongoDB for managing user
        profiles, and AWS S3 for storing and serving your high-quality images.
      </p>
      <div className="space-x-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-4">
              Hello, {name} ({email})! You are logged in.
            </p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login with Google
          </button>
        )}
      </div>
      <div className="mt-10 w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Key Features:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-3">MongoDB Integration</h3>
            <p className="text-gray-600">
              User profiles and wallpapers are securely managed using MongoDB,
              ensuring scalable and reliable data storage.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-3">Google OAuth</h3>
            <p className="text-gray-600">
              We use Google OAuth for secure login, ensuring your data is safe
              and protected with industry-standard authentication.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-3">AWS S3 Storage</h3>
            <p className="text-gray-600">
              All uploaded wallpapers are stored in AWS S3, providing fast and
              reliable access to your images with secure cloud storage.
            </p>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-gray-500 text-center">
        <p>&copy; 2024 WallPaper App. All rights reserved.</p>
      </footer>
    </section>
  );
}
