import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"
import { getUsers, getAgents } from "@/lib/actions"
import { AgentGrid } from "@/components/admin/agent-grid"
import { AgentCard } from "@/components/admin/agent-card"
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Users & Agents | Real Estate Admin",
  description: "Manage users and agents",
}

export default async function UsersPage() {
  const [users, agents] = await Promise.all([getUsers(), getAgents()])
  const t = await getTranslations('dashboard');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('usersAndAgents')}</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users/new-user">
              <PlusCircle className="mr-2 h-4 w-4" />
             {t('addUser')}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users/new-agent">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('addAgent')}
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="agents">{t('agents')}</TabsTrigger>
          <TabsTrigger value="users">{t('users')}</TabsTrigger>
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

