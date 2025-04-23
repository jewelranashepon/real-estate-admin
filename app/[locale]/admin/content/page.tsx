// "use client";

// import React, { useEffect, useState } from "react";
// import BlogPostForm from "@/components/admin/BlogPostForm";
// import PaginatedItems from "@/components/admin/Pagination";

// interface Blog {
//   id: number;
//   post_title: string;
//   post_content: string;
//   post_category: string;
//   post_tags: string;
//   post_image: string;
//   createdAt: string;
// }

// const BlogManagement: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editBlogData, setEditBlogData] = useState<Blog | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch("/api/blogfetch");
//         if (!response.ok) throw new Error("Failed to fetch blogs.");
//         const data = await response.json();

//         const transformedData: Blog[] = data.map((item: any) => ({
//           id: item.id,
//           post_title: item.post_title,
//           post_content:
//             typeof item.post_content === "object" && item.post_content.text
//               ? item.post_content.text
//               : String(item.post_content),
//           post_category: item.category,
//           post_tags: item.tags,
//           post_image: item.post_image,
//           createdAt: item.createdAt,
//         }));

//         setBlogs(transformedData);
//       } catch (err) {
//         setError("Failed to fetch blogs. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const filteredPosts = blogs.filter((post) =>
//     post.post_title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCreateNewClick = () => {
//     setEditBlogData(null);
//     setIsFormVisible(true);
//   };

//   const handleEditClick = (blog: Blog) => {
//     setEditBlogData(blog);
//     setIsFormVisible(true);
//   };

//   const handleDeleteClick = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this blog post?")) return;

//     try {
//       const res = await fetch("/api/blogfetch", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (res.ok) {
//         setBlogs((prev) => prev.filter((blog) => blog.id !== id));
//         alert("Blog post deleted successfully!");
//       } else {
//         alert("Failed to delete blog post.");
//       }
//     } catch (error) {
//       alert("An unexpected error occurred.");
//     }
//   };

//   const handleCloseModal = () => setIsFormVisible(false);

//   const handleUpdateBlog = (updatedBlog: Blog) => {
//     setBlogs((prev) =>
//       prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600 text-lg">Loading blogs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
//           <p className="text-gray-500">Manage your published blog posts</p>
//         </div>
//         <div className="flex gap-3 flex-wrap items-center">
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={handleCreateNewClick}
//             className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             + Create New Blog
//           </button>
//         </div>
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
//           {error}
//         </div>
//       )}

//       {/* Modal */}
//       {isFormVisible && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
//           onClick={handleCloseModal}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {editBlogData ? "Edit Blog" : "Create New Blog"}
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="text-gray-400 hover:text-red-600 text-xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//             <BlogPostForm
//               initialData={editBlogData}
//               onClose={handleCloseModal}
//               onUpdate={handleUpdateBlog}
//             />
//           </div>
//         </div>
//       )}

//       {/* Blog List */}
//       <section>
//         <div className="mb-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             All Blogs{" "}
//             <span className="text-blue-600">({filteredPosts.length})</span>
//           </h2>
//         </div>

//         {filteredPosts.length > 0 ? (
//           <PaginatedItems
//             blogs={filteredPosts}
//             itemsPerPage={6}
//             onEdit={handleEditClick}
//             onDelete={handleDeleteClick}
//           />
//         ) : (
//           <div className="text-center py-12 text-gray-500">
//             <p className="text-lg">No blogs found.</p>
//             <p className="text-sm mt-1">
//               Try adjusting your search or create a new blog post.
//             </p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default BlogManagement;

"use client";

import React, { useEffect, useState } from "react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import PaginatedItems from "@/components/admin/Pagination";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Blog {
  id: number;
  post_title: string;
  post_content: string;
  post_category: string;
  post_tags: string;
  post_image: string;
  createdAt: string;
}

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editBlogData, setEditBlogData] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useParams();
  const t = useTranslations("blogManagement");
  const isRtl = locale === "ar";

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/blogfetch");
        if (!response.ok) throw new Error(t("errorMessage"));
        const data = await response.json();

        const transformedData: Blog[] = data.map((item: any) => ({
          id: item.id,
          post_title: item.post_title,
          post_content:
            typeof item.post_content === "object" && item.post_content.text
              ? item.post_content.text
              : String(item.post_content),
          post_category: item.category,
          post_tags: item.tags,
          post_image: item.post_image,
          createdAt: item.createdAt,
        }));

        setBlogs(transformedData);
      } catch (err) {
        setError(t("errorMessage"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [t]);

  const filteredPosts = blogs.filter((post) =>
    post.post_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNewClick = () => {
    setEditBlogData(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (blog: Blog) => {
    setEditBlogData(blog);
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm(t("deleteConfirmation"))) return;

    try {
      const res = await fetch("/api/blogfetch", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        alert(t("deleteSuccess"));
      } else {
        alert(t("deleteFailure"));
      }
    } catch (error) {
      alert(t("unexpectedError"));
    }
  };

  const handleCloseModal = () => setIsFormVisible(false);

  const handleUpdateBlog = (updatedBlog: Blog) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreateNewClick}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {t("createButton")}
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Modal */}
      {isFormVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editBlogData ? t("modal.editTitle") : t("modal.createTitle")}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-red-600 text-xl font-bold"
              >
                {t("modal.closeButton")}
              </button>
            </div>
            <BlogPostForm
              initialData={editBlogData}
              onClose={handleCloseModal}
              onUpdate={handleUpdateBlog}
            />
          </div>
        </div>
      )}

      {/* Blog List */}
      <section>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("allBlogs")}{" "}
            <span className="text-blue-600">({filteredPosts.length})</span>
          </h2>
        </div>

        {filteredPosts.length > 0 ? (
          <PaginatedItems
            blogs={filteredPosts}
            itemsPerPage={6}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">{t("noBlogs.message")}</p>
            <p className="text-sm mt-1">{t("noBlogs.suggestion")}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogManagement;
