import type { Metadata } from "next"
import { getUsers } from "@/lib/actions"
import { AgentForm } from "@/components/admin/agent-form"

export const metadata: Metadata = {
  title: "Add Agent | Real Estate Admin",
  description: "Add a new agent",
}

export default async function NewAgentPage() {
  const users = await getUsers()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Add Agent</h1>
      <AgentForm users={users} />
    </div>
  )
}

