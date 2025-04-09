// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { X } from 'lucide-react';
// import { UploadButton } from "./uploadthing";

// interface ImageUploaderProps {
//   currentImageUrl?: string;
//   onImageUploaded: (imageUrl: string) => void;
// }

// const ImageUploader: React.FC<ImageUploaderProps> = ({
//   currentImageUrl,
//   onImageUploaded,
// }) => {
//   const [imageUrl, setImageUrl] = useState<string | undefined>(currentImageUrl);
//   const [uploading, setUploading] = useState(false);

//   const handleUploadComplete = (res: { url: string }[]) => {
//     const url = res[0]?.url;
//     if (url) {
//       setImageUrl(url);
//       onImageUploaded(url);
//     }
//     setUploading(false);
//   };

//   const handleUploadError = (error: Error) => {
//     console.error("Upload error:", error);
//     alert("Upload failed. Please try again.");
//     setUploading(false);
//   };

//   const removeImage = () => {
//     setImageUrl(undefined);
//     onImageUploaded("");
//   };

//   return (
//     <div className="w-full">
//       {imageUrl ? (
//         <div className="relative w-full max-w-md mb-4">
//           <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-200">
//             <Image
//               src={imageUrl || "/placeholder.svg"}
//               alt="Blog post featured image"
//               fill
//               style={{ objectFit: "cover" }}
//             />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//               aria-label="Remove image"
//             >
//               <X size={20} className="text-gray-700" />
//             </button>
//           </div>
//           <p className="mt-2 text-sm text-gray-500 truncate">
//             {imageUrl.split("/").pop()}
//           </p>
//         </div>
//       ) : (
//         <div className="w-full max-w-md">
//           <UploadButton
//             endpoint="imageUploader"
//             onClientUploadComplete={handleUploadComplete}
//             onUploadError={handleUploadError}
//             onUploadBegin={() => setUploading(true)}
//             className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
//           />
//           {uploading && (
//             <p className="mt-2 text-sm text-gray-600">Uploading image...</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;


















"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { UploadButton } from "./uploadthing"

interface ImageUploaderProps {
  currentImageUrl?: string
  onImageUploaded: (imageUrl: string) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImageUrl, onImageUploaded }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(currentImageUrl)
  const [uploading, setUploading] = useState(false)

  const handleUploadComplete = (res: { url: string }[]) => {
    const url = res[0]?.url
    if (url) {
      setImageUrl(url)
      onImageUploaded(url)
    }
    setUploading(false)
  }

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error)
    alert("Upload failed. Please try again.")
    setUploading(false)
  }

  const removeImage = () => {
    setImageUrl(undefined)
    onImageUploaded("")
  }

  return (
    <div className="w-full">
      {imageUrl ? (
        <div className="relative w-full max-w-md mb-4">
          <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Blog post featured image"
              fill
              style={{ objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Remove image"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 truncate">{imageUrl.split("/").pop()}</p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onUploadBegin={() => setUploading(true)}
            className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
          />
          {uploading && <p className="mt-2 text-sm text-gray-600">Uploading image...</p>}
        </div>
      )}
    </div>
  )
}

export default ImageUploader
