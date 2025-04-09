import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"
import { getUsers, getAgents } from "@/lib/actions"
import { AgentGrid } from "@/components/admin/agent-grid"
import { AgentCard } from "@/components/admin/agent-card"

export const metadata: Metadata = {
  title: "Users & Agents | Real Estate Admin",
  description: "Manage users and agents",
}

export default async function UsersPage() {
  const [users, agents] = await Promise.all([getUsers(), getAgents()])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users & Agents</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users/new-agent">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Agent
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="agents" className="pt-4">
          <AgentGrid agents={agents} />
          {/* <AgentCard agent={agents}/> */}
        </TabsContent>
        <TabsContent value="users" className="pt-4">
          <UsersTable users={users} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

