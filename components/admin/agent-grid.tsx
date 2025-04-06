"use client"

import { useState } from "react"
import { AgentCard } from "./agent-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteAgent } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

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

interface AgentGridProps {
  agents: AgentWithRelations[]
}

export function AgentGrid({ agents }: AgentGridProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null)

  // Filter agents based on search query
  const filteredAgents = agents.filter((agent) => {
    const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase()
    const searchLower = searchQuery.toLowerCase()

    return (
      fullName.includes(searchLower) ||
      agent.companyName.toLowerCase().includes(searchLower) ||
      agent.email.toLowerCase().includes(searchLower) ||
      agent.languages.some((l) => l.language.toLowerCase().includes(searchLower)) ||
      agent.badges.some((b) => b.name.toLowerCase().includes(searchLower))
    )
  })

  const handleDeleteClick = (id: string) => {
    setAgentToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteAgent = async () => {
    if (!agentToDelete) return

    try {
      const result = await deleteAgent(agentToDelete)

      if (result.success) {
        toast({
          title: "Agent deleted",
          description: "The agent has been successfully deleted.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete agent. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setAgentToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button asChild>
          <Link href="/admin/users/new-agent">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Agent
          </Link>
        </Button>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-semibold">No agents found</h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Get started by adding a new agent"}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/admin/users/new-agent">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Agent
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDelete={handleDeleteClick} />
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agent and remove the association from any
              properties.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAgent} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
