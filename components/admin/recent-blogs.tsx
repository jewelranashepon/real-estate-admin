
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

function stripHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export const RecentBlogs = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="overflow-hidden shadow-sm border rounded-xl flex flex-col"
        >
          <div className="w-full h-52 relative">
            <Image
              src={blog.post_image || "/images/blog1.webp"}
              alt={blog.post_title || "Blog Image"}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800 truncate">
                {blog.post_title || "Untitled"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </p>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {stripHtml(blog.post_content || "No content available.")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
