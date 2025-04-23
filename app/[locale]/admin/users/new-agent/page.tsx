import { getUsers } from "@/lib/actions";
import { AgentForm } from "@/components/admin/agent-form";
import { getTranslations } from "next-intl/server"; // Changed to server version

export default async function NewAgentPage() {
  const users = await getUsers();
  const t = await getTranslations("agentForm");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">إضافة وكيل</h1>
      <AgentForm users={users} />
    </div>
  );
}
