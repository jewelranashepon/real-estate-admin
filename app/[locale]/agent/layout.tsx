import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AgentSidebar from "@/components/agent/agent-sidebar";
import AgentHeader from "@/components/agent/agent-header";
import { notFound } from "next/navigation";

export default async function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  let messages;
  try {
    messages = (await import(`../../../locale/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AgentSidebar />
        <div className="flex rtl:order-2 flex-1 flex-col overflow-hidden">
          <AgentHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
