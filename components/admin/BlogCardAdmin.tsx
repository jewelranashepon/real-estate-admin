import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

// Define the Blog type and component props
type Blog = {
  id: number;
  post_title: string;
  post_content: string;
  post_image: string;
};

type BlogCardProps = {
  blog: Blog;
  onEdit: () => void;
  onDelete: () => void;
};

// Function to extract the first image from HTML content
// const extractFirstImage = (htmlContent: string): string | null => {
//   if (typeof window !== "undefined") {
//     const imgElement = new DOMParser()
//       .parseFromString(htmlContent, "text/html")
//       .querySelector("img");
//     return imgElement?.getAttribute("src") || null; // Return null if no image is found
//   }
//   return null; // Fallback for SSR
// };

const BlogCardAdmin: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
  // const [imageUrl, setImageUrl] = useState<string | null>(null); // Initialize as null

  // useEffect(() => {
  //   setImageUrl(extractFirstImage(blog.post_content));
  // }, [blog]);

  return (
    <div className="bg-white h-80 shadow-md rounded-xl border border-gray-200 flex flex-col justify-between">
      <div className="w-full h-44 flex items-center justify-center">
        {blog.post_image ? (
          <Image
            src={blog.post_image}
            alt="Featured Journal"
            className="w-full h-full object-fill rounded-t-xl"
            width={1200}
            height={600}
          />
        ) : (
          <Image
            src="/images/blog1.webp"
            alt="No Image Available"
            className="w-full h-full object-fill rounded-t-xl"
            width={1200}
            height={600}
          />
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-medium text-lg text-gray-800">
            {blog.post_title || "Untitled"}
          </h3>
          <p
            className="text-gray-600 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.post_content }}
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <button
            className="text-blue-500 text-sm font-bold flex items-center gap-1"
            onClick={onEdit}
            aria-label="Edit Blog"
          >
            <FaEdit className="text-lg" />
            Edit
          </button>
          <button
            className="text-red-500 text-sm font-bold flex items-center gap-1"
            onClick={onDelete}
            aria-label="Delete Blog"
          >
            <RiDeleteBin6Line className="text-lg" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCardAdmin;
