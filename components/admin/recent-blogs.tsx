// // components/admin/recent-blogs.tsx
// import { Card, CardContent } from "@/components/ui/card";

// interface Blog {
//   id: number;
//   post_title: string;
//   createdAt: string;
//   post_content: string;
//   post_category: string;
//   post_image: string;
//   post_tags: string;
//   post_status: string;
// }

// export const RecentBlogs = ({ blogs }: { blogs: Blog[] }) => {
//   return (
//     <ul className="space-y-4">
//       {blogs.map((blog) => (
//         <li key={blog.id}>
//           <Card>
//             <CardContent className="p-4">
//               <h3 className="text-lg font-semibold">{blog.post_title}</h3>
//               <p className="text-sm text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</p>
//             </CardContent>
//           </Card>
//         </li>
//       ))}
//     </ul>
//   );
// };









// components/admin/recent-blogs.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Blog {
  id: number;
  post_title: string;
  createdAt: string;
  post_content: string;
  post_category: string;
  post_image: string;
  post_tags: string;
  post_status: string;
}

export const RecentBlogs = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <Card key={blog.id} className="overflow-hidden shadow-sm border">
          {/* Image Section */}
          <div className="w-full h-52 relative">
            <Image
              src={blog.post_image || "/images/blog1.webp"}
              alt={blog.post_title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {blog.post_title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p
              className="text-sm text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: blog.post_content }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
