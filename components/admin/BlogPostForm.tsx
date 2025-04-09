// "use client";
// import React, { useState, useEffect } from "react";
// import RichTextEditor from "./RichTextEditor";

// interface BlogPostFormProps {
//   initialData?: {
//     id?: number;
//     post_title: string;
//     post_content: string;
//     post_category?: string;
//     post_tags?: string;
//   } | null; // Allow null
//   onClose: () => void;
//   onUpdate: (updatedBlog: any) => void; // Pass updated data to the parent
// }

// interface FormData {
//   id?: number;
//   title: string;
//   content: string;
//   category: string;
//   tags?: string; // Made optional
// }

// const BlogPostForm: React.FC<BlogPostFormProps> = ({
//   initialData,
//   onClose,
//   onUpdate,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     id: initialData?.id || undefined,
//     title: initialData?.post_title || "",
//     content: initialData?.post_content || "",
//     category: initialData?.post_category || "",
//     tags: initialData?.post_tags || "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         id: initialData.id || undefined,
//         title: initialData.post_title || "",
//         content: initialData.post_content || "",
//         category: initialData.post_category || "",
//         tags: initialData.post_tags || "",
//       });
//     }
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formToSubmit = {
//       id: formData.id,
//       post_title: formData.title, // Ensure correct field names
//       post_content: formData.content,
//       category: formData.category,
//       tags: formData.tags || "",
//     };

//     try {
//       const response = await fetch("/api/blogfetch", {
//         // Ensure correct API path
//         method: formData.id ? "PUT" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formToSubmit),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert(
//           formData.id ? "Blog updated successfully!" : "Blog post created!"
//         );
//         onUpdate(result); // Pass the updated data to parent
//         onClose();
//       } else {
//         alert("Failed to save blog post. Please try again.");
//       }
//     } catch (error) {
//       alert("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6">
//       <div>
//         <label htmlFor="title" className="block text-lg font-medium mb-2">
//           Blog Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter blog title"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="category" className="block text-lg font-medium mb-2">
//           Category
//         </label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter blog category"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="tags" className="block text-lg font-medium mb-2">
//           Tags (Optional)
//         </label>
//         <input
//           type="text"
//           id="tags"
//           name="tags"
//           value={formData.tags}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter tags separated by commas"
//         />
//       </div>

//       <div>
//         <label htmlFor="content" className="block text-lg font-medium mb-2">
//           Blog Content
//         </label>
//         <RichTextEditor
//           value={formData.content}
//           onChange={(content) =>
//             setFormData((prev) => ({
//               ...prev,
//               content,
//             }))
//           }
//         />
//       </div>

//       <div className="text-right">
//         <button
//           type="submit"
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           {formData.id ? "Update Blog" : "Publish Blog"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogPostForm;





























// "use client";
// import React, { useState, useEffect } from "react";
// import RichTextEditor from "./RichTextEditor";
// import ImageUploader from "./ImageUploader";

// interface BlogPostFormProps {
//   initialData?: {
//     id?: number;
//     post_title: string;
//     post_content: string;
//     post_category?: string;
//     post_tags?: string;
//     post_image?: string; // Added for image URL
//   } | null; // Allow null
//   onClose: () => void;
//   onUpdate: (updatedBlog: any) => void; // Pass updated data to the parent
// }

// interface FormData {
//   id?: number;
//   title: string;
//   content: string;
//   category: string;
//   tags?: string; // Made optional
//   image?: string; // Added for image URL
// }

// const BlogPostForm: React.FC<BlogPostFormProps> = ({
//   initialData,
//   onClose,
//   onUpdate,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     id: initialData?.id || undefined,
//     title: initialData?.post_title || "",
//     content: initialData?.post_content || "",
//     category: initialData?.post_category || "",
//     tags: initialData?.post_tags || "",
//     image: initialData?.post_image || "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         id: initialData.id || undefined,
//         title: initialData.post_title || "",
//         content: initialData.post_content || "",
//         category: initialData.post_category || "",
//         tags: initialData.post_tags || "",
//         image: initialData.post_image || "",
//       });
//     }
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUploaded = (imageUrl: string) => {
//     setFormData((prev) => ({ ...prev, image: imageUrl }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formToSubmit = {
//       id: formData.id,
//       post_title: formData.title, // Ensure correct field names
//       post_content: formData.content,
//       post_category: formData.category, // Fixed field name to match
//       post_tags: formData.tags || "",
//       post_image: formData.image || "", // Added image URL
//     };

//     try {
//       const response = await fetch("/api/blogfetch", {
//         // Ensure correct API path
//         method: formData.id ? "PUT" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formToSubmit),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert(
//           formData.id ? "Blog updated successfully!" : "Blog post created!"
//         );
//         onUpdate(result); // Pass the updated data to parent
//         onClose();
//       } else {
//         alert("Failed to save blog post. Please try again.");
//       }
//     } catch (error) {
//       alert("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6">
//       <div>
//         <label htmlFor="title" className="block text-lg font-medium mb-2">
//           Blog Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter blog title"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="category" className="block text-lg font-medium mb-2">
//           Category
//         </label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter blog category"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="tags" className="block text-lg font-medium mb-2">
//           Tags (Optional)
//         </label>
//         <input
//           type="text"
//           id="tags"
//           name="tags"
//           value={formData.tags}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//           placeholder="Enter tags separated by commas"
//         />
//       </div>
      
//       <div>
//         <label className="block text-lg font-medium mb-2">
//           Featured Image
//         </label>
//         <ImageUploader 
//           currentImageUrl={formData.image} 
//           onImageUploaded={handleImageUploaded} 
//         />
//       </div>

//       <div>
//         <label htmlFor="content" className="block text-lg font-medium mb-2">
//           Blog Content
//         </label>
//         <RichTextEditor
//           value={formData.content}
//           onChange={(content) =>
//             setFormData((prev) => ({
//               ...prev,
//               content,
//             }))
//           }
//         />
//       </div>

//       <div className="text-right">
//         <button
//           type="submit"
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           {formData.id ? "Update Blog" : "Publish Blog"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogPostForm;










"use client"
import type React from "react"
import { useState, useEffect } from "react"
import RichTextEditor from "./RichTextEditor"
import ImageUploader from "./ImageUploader"

interface BlogPostFormProps {
  initialData?: {
    id?: number
    post_title: string
    post_content: string
    category?: string
    tags?: string
    post_image?: string // Added for image URL
  } | null // Allow null
  onClose: () => void
  onUpdate: (updatedBlog: any) => void // Pass updated data to the parent
}

interface FormData {
  id?: number
  title: string
  content: string
  category: string
  tags?: string // Made optional
  image?: string // Added for image URL
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<FormData>({
    id: initialData?.id || undefined,
    title: initialData?.post_title || "",
    content: initialData?.post_content || "",
    category: initialData?.category || "",
    tags: initialData?.tags || "",
    image: initialData?.post_image || "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || undefined,
        title: initialData.post_title || "",
        content: initialData.post_content || "",
        category: initialData.category || "",
        tags: initialData.tags || "",
        image: initialData.post_image || "",
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUploaded = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formToSubmit = {
      id: formData.id,
      post_title: formData.title,
      post_content: formData.content,
      post_category: formData.category, // Match the field name in API
      post_tags: formData.tags || "",
      post_image: formData.image || "", // Added image URL
    }

    try {
      const response = await fetch("/api/blogfetch", {
        method: formData.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formToSubmit),
      })

      const result = await response.json()

      if (response.ok) {
        alert(formData.id ? "Blog updated successfully!" : "Blog post created!")
        onUpdate(result) // Pass the updated data to parent
        onClose()
      } else {
        alert("Failed to save blog post. Please try again.")
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-medium mb-2">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder="Enter blog title"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder="Enter blog category"
          required
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-lg font-medium mb-2">
          Tags (Optional)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Featured Image</label>
        <ImageUploader currentImageUrl={formData.image} onImageUploaded={handleImageUploaded} />
      </div>

      <div>
        <label htmlFor="content" className="block text-lg font-medium mb-2">
          Blog Content
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) =>
            setFormData((prev) => ({
              ...prev,
              content,
            }))
          }
        />
      </div>

      <div className="text-right">
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {formData.id ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </form>
  )
}

export default BlogPostForm
