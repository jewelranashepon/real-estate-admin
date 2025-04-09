import type { Metadata } from "next"
import { getAgentById, getUsers } from "@/lib/actions"
import { notFound } from "next/navigation"
import { AgentForm } from "@/components/admin/agent-form"

export const metadata: Metadata = {
  title: "Edit Agent | Real Estate Admin",
  description: "Edit agent details",
}

interface EditAgentPageProps {
  params: {
    id: string
  }
}

export default async function EditAgentPage({ params }: EditAgentPageProps) {
  const [agent, users] = await Promise.all([getAgentById(params.id), getUsers()])

  if (!agent) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Agent</h1>
      <AgentForm agent={agent} users={users} />
    </div>
  )
}

