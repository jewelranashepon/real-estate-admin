"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Mail,
  Phone,
  MessageSquare,
  Home,
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { useState } from "react"

interface AgentWithRelations {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  title: string
  bio?: string | null
  website?: string | null
  profileImageUrl?: string | null
  propertiesSold: number
  propertiesListed: number
  propertiesChecked: number
  yearsOfExperience: number
  languages: {
    id: number
    language: string
  }[]
  badges: {
    id: number
    name: string
  }[]
  socialMedia?: {
    facebook?: string | null
    twitter?: string | null
    instagram?: string | null
    linkedin?: string | null
    youtube?: string | null
  } | null
}

interface AgentCardProps {
  agent: AgentWithRelations
  onDelete?: (id: string) => void
  variant?: "default" | "compact"
}

export function AgentCard({ agent, onDelete, variant = "default" }: AgentCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const fullName = `${agent.firstName} ${agent.lastName}`
  const initials = `${agent.firstName.charAt(0)}${agent.lastName.charAt(0)}`
  const profileImage = agent.profileImageUrl || "/placeholder.svg"
  const languagesText = agent.languages.map((l) => l.language).join(", ")

  const getBadgeVariant = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("broker")) return "default"
    if (lowerName.includes("lister")) return "secondary"
    if (lowerName.includes("responsive")) return "outline"
    return "default"
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profileImage} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{fullName}</h3>
              <p className="text-sm text-muted-foreground">{agent.companyName}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {agent.profileImageUrl ? (
          <img
            src={profileImage}
            alt={fullName}
            className="h-full w-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=300"
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">{fullName}</h3>
            <p className="text-sm text-muted-foreground">{agent.companyName}</p>
          </div>

          {agent.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {agent.badges.map((badge) => (
                <Badge key={badge.id} variant={getBadgeVariant(badge.name)}>
                  {badge.name}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{agent.propertiesListed} Properties</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span>{agent.propertiesChecked} Checked</span>
            </div>
          </div>

          {agent.languages.length > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Speaks {languagesText}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-3 gap-2 p-4 pt-0">
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={`mailto:${agent.email}`}>
            <Mail className="mr-1 h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Email</span>
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={`tel:${agent.phone}`}>
            <Phone className="mr-1 h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Call</span>
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Chat</span>
          </a>
        </Button>
      </CardFooter>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{fullName}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileImage} alt={fullName} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{fullName}</h3>
                <p className="text-sm">
                  {agent.title} at {agent.companyName}
                </p>

                {agent.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {agent.badges.map((badge) => (
                      <Badge key={badge.id} variant={getBadgeVariant(badge.name)}>
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {agent.bio && (
              <div>
                <h4 className="mb-2 font-medium">About</h4>
                <p className="text-sm text-muted-foreground">{agent.bio}</p>
              </div>
            )}

            <div className="grid gap-2">
              <h4 className="font-medium">Contact Information</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${agent.email}`} className="text-primary hover:underline">
                    {agent.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${agent.phone}`} className="text-primary hover:underline">
                    {agent.phone}
                  </a>
                </div>
                {agent.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={agent.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {agent.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="mb-2 font-medium">Statistics</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Properties Listed:</span>
                    <span className="font-medium">{agent.propertiesListed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Properties Sold:</span>
                    <span className="font-medium">{agent.propertiesSold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Properties Checked:</span>
                    <span className="font-medium">{agent.propertiesChecked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Years of Experience:</span>
                    <span className="font-medium">{agent.yearsOfExperience}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((lang) => (
                    <Badge key={lang.id} variant="outline">
                      {lang.language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {agent.socialMedia && Object.values(agent.socialMedia).some(Boolean) && (
              <div>
                <h4 className="mb-2 font-medium">Social Media</h4>
                <div className="flex gap-2">
                  {agent.socialMedia.facebook && (
                    <a href={agent.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {agent.socialMedia.twitter && (
                    <a href={agent.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {agent.socialMedia.instagram && (
                    <a href={agent.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {agent.socialMedia.linkedin && (
                    <a href={agent.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}