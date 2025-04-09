import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentPages } from "@/components/admin/content-pages"
import { ContentBlogs } from "@/components/admin/content-blogs"
import { ContentMedia } from "@/components/admin/content-media"

export const metadata: Metadata = {
  title: "Content | Real Estate Admin",
  description: "Manage website content",
}

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="pt-4">
          <ContentPages />
        </TabsContent>
        <TabsContent value="blogs" className="pt-4">
          <ContentBlogs />
        </TabsContent>
        <TabsContent value="media" className="pt-4">
          <ContentMedia />
        </TabsContent>
      </Tabs>
    </div>
  )
}

