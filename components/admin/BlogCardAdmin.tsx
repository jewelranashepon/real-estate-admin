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

const BlogCardAdmin: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col overflow-hidden">
      <div className="w-full h-44 flex items-center justify-center">
        {blog.post_image ? (
          <Image
            src={blog.post_image}
            alt="Featured Journal"
            className="w-full h-full object-cover rounded-t-xl"
            width={1200}
            height={600}
          />
        ) : (
          <Image
            src="/images/blog1.webp"
            alt="No Image Available"
            className="w-full h-full object-cover rounded-t-xl"
            width={1200}
            height={600}
          />
        )}
      </div>

      <div className="flex flex-col justify-between p-6 flex-1">
        <div className="mb-4 overflow-hidden">
          <h3 className="font-medium text-lg text-gray-800">
            {blog.post_title || "Untitled"}
          </h3>
          <p
            className="text-gray-600 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.post_content }}
          />
        </div>

        <div className="flex gap-2 justify-between items-center mt-4">
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
