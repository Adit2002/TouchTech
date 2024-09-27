'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { uploadFile } from './action';
import { fetchUserWallpaperByEmail } from './actionwallpaper';

interface Wallpaper {
  imageURI: string | number;
  imageName: string | null;
}

export default function WallpaperSelector() {
  const { data: session, status } = useSession();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]); 
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  let EMAIL=null;
  if(session){
    EMAIL=session.email;
    console.log(EMAIL);
  }
  useEffect(() => {
    if (status === 'loading') return;
    
    const fetchWallpapers = async () => {
      if (EMAIL) {
        try {
          const wallpapersData = await fetchUserWallpaperByEmail(EMAIL);
          setWallpapers(wallpapersData);
        } catch (error) {
          console.error('Error fetching wallpapers:', error);
        }
      }
    };
    
    fetchWallpapers();
  }, [session, status,EMAIL]); 
  const handleWallpaperChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallpaper(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('customFileName', fileName);

    try {
      if(EMAIL===null) return;
      await uploadFile(formData, EMAIL); 
      setMessage('File uploaded successfully!');
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload file.');
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: selectedWallpaper ? `url(${selectedWallpaper})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Wallpaper Selection Section */}
      <div className="p-4 bg-gray-900 rounded-lg shadow-lg mb-6">
        <h1 className="text-white text-center mb-4">Select Your Wallpaper</h1>
        {status === 'loading' ? (
          <p className="text-white text-center">Loading wallpapers...</p>
        ) : (
          <select
            className="p-2 rounded bg-gray-800 text-white w-full"
            value={selectedWallpaper}
            onChange={handleWallpaperChange}
          >
            <option value="">Select a wallpaper</option>
            {wallpapers.map((wallpaper) => (
              <option key={wallpaper.imageURI} value={wallpaper.imageURI}>
                {wallpaper.imageName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Upload Custom Wallpaper Section */}
      <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-white text-center mb-4">Upload New Wallpaper</h2>
        <form onSubmit={handleUpload} className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            value={fileName}
            placeholder="Enter custom file name"
            onChange={(e) => setFileName(e.target.value)}
            className="mb-4 p-2 rounded bg-gray-800 text-white w-full"
          />
          <button type="submit" className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700">
            Upload
          </button>
        </form>
        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
