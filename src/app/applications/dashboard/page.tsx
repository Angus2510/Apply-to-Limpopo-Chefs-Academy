'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const fetchVideoUrl = async () => {
    if (!videoUrlInput) {
      console.error('Video URL input is empty');
      return;
    }

    // Extract the key from the S3 URL
    const url = new URL(videoUrlInput);
    let key = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;

    // Ensure key does not have leading slashes
    key = key.replace(/^\/+/, '');

    try {
      const response = await fetch(`/api/get-signed-url?key=${encodeURIComponent(key)}`);
      if (!response.ok) {
        throw new Error('Error fetching video URL');
      }
      const data = await response.json();
      console.log('Fetched video URL:', data.url); // Log the fetched URL
      setVideoUrl(data.url);
    } catch (error) {
      console.error('Failed to fetch video URL', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow pt-20 p-8">
        <h2 className="text-xl font-semibold">View Video</h2>
        <div className="mt-4">
          <input
            type="text"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
            placeholder="Enter S3 video URL"
            className="border p-2 mr-2 w-full max-w-md"
          />
          <Button onClick={fetchVideoUrl} className="w-auto">Fetch Video</Button>
        </div>
        {videoUrl && (
          <div className="mt-4">
            <video controls className="w-full max-w-md">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </main>
    </div>
  );
}
