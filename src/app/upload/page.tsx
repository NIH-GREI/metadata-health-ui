'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(''); // Store the file name
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); //This is the file being uploaded
      setFileName(e.target.files[0].name); //Set the custom file name  which should match profile id
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName.trim()) {
      toast.error("Please select a file and enter a file name.");
      //setMessage('Please select a file and enter a file name.');
      return;
    }

    // Ensure the filename has a .json extension
    let finalFileName = fileName.trim();
    if (!finalFileName.endsWith('.json')) {
      finalFileName += '.json';
    }

    // Create a new File object with the desired name
    const renamedFile = new File([file], finalFileName, { type: file.type });

    const formData = new FormData();
    formData.append('file', renamedFile); // Upload the renamed file

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      // Store message in sessionStorage before redirect
      sessionStorage.setItem('toastMessage', result.message || 'File uploaded successfully');

      // Redirect to the new page
      router.push(`/providers/${fileName}`);
    } else {
      toast.error(result.error || 'Upload failed.');
    }
    toast.error(result.message || result.error);
    //  setMessage(result.message || result.error);
  };


  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg w-96 mx-auto">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Enter simple file name or id"

        onChange={(e) => setFileName((e.target.value).trim().toLowerCase())}
        className="border rounded-lg p-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        Upload
      </button>
      {/* {message && <p className="text-gray-700 text-sm">{message}</p>} */}
    </div>
  );
}
