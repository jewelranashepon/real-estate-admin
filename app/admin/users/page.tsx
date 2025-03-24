import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { UsersTable } from "@/components/admin/users-table"
import { getUsers } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Users & Agents | Real Estate Admin",
  description: "Manage users and agents",
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users & Agents</h1>
        <Button asChild>
          <Link href="/admin/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <UsersTable users={users} />
      </div>
    </div>
  )
}

