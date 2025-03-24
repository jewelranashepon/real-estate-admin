"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadCloud, Image, FileText, Video, Trash2, Download, Copy, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"

interface MediaItem {
  id: string
  name: string
  type: "image" | "document" | "video"
  url: string
  size: string
  dimensions?: string
  uploadedBy: string
  uploadDate: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    name: "property-exterior.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    name: "floor-plan.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "850 KB",
    dimensions: "1500x1200",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    name: "property-brochure.pdf",
    type: "document",
    url: "#",
    size: "3.5 MB",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-13T11:45:00Z",
  },
  {
    id: "4",
    name: "virtual-tour.mp4",
    type: "video",
    url: "#",
    size: "24.8 MB",
    dimensions: "1920x1080",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    name: "property-interior.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "950 KB",
    dimensions: "1800x1200",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-11T13:15:00Z",
  },
  {
    id: "6",
    name: "contract-template.pdf",
    type: "document",
    url: "#",
    size: "420 KB",
    uploadedBy: "Admin User",
    uploadDate: "2023-11-10T15:30:00Z",
  },
]

export function ContentMedia() {
  const [data, setData] = useState<MediaItem[]>(mockMediaItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredData = data.filter((item) => {
    // Filter by search query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "images" && item.type === "image") ||
      (activeTab === "documents" && item.type === "document") ||
      (activeTab === "videos" && item.type === "video")

    return matchesSearch && matchesTab
  })

  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id)
    setData(updatedData)
    toast({
      title: "Media deleted",
      description: "The media item has been deleted.",
    })
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "The media URL has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search media..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            toast({
              title: "Upload media",
              description: "Media upload functionality would be implemented here.",
            })
          }}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                {item.type === "image" ? (
                  <div className="aspect-video bg-muted">
                    <img src={item.url || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                ) : item.type === "document" ? (
                  <div className="flex aspect-video items-center justify-center bg-muted">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted">
                    <Video className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute right-2 top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Download started",
                            description: `Downloading ${item.name}.`,
                          })
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-1">
                  <div className="font-medium truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{item.size}</span>
                    {item.dimensions && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{item.dimensions}</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(new Date(item.uploadDate).toString())}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center text-center">
              <Image className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No media found</h3>
              <p className="mt-1 text-xs text-muted-foreground">Upload media or try a different search term.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

