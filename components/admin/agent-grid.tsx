"use client";

import { useState } from "react";
import { AgentCard } from "./agent-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteAgent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

interface AgentWithRelations {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  title: string;
  bio?: string | null;
  website?: string | null;
  profileImageUrl?: string | null;
  propertiesSold: number;
  propertiesListed: number;
  propertiesChecked: number;
  yearsOfExperience: number;
  languages: {
    id: number;
    language: string;
  }[];
  badges: {
    id: number;
    name: string;
  }[];
  socialMedia?: {
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
  } | null;
}

interface AgentGridProps {
  agents: AgentWithRelations[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  const router = useRouter();
  const t = useTranslations("dashboard.dashboardAgents");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  // Filter agents based on search query
  const filteredAgents = agents.filter((agent) => {
    const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return (
      fullName.includes(searchLower) ||
      agent.companyName.toLowerCase().includes(searchLower) ||
      agent.email.toLowerCase().includes(searchLower) ||
      agent.languages.some((l) =>
        l.language.toLowerCase().includes(searchLower)
      ) ||
      agent.badges.some((b) => b.name.toLowerCase().includes(searchLower))
    );
  });

  const handleDeleteClick = (id: string) => {
    setAgentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAgent = async () => {
    if (!agentToDelete) return;

    try {
      const result = await deleteAgent(agentToDelete);

      if (result.success) {
        toast({
          title: t("toast.deleteSuccess.title"),
          description: t("toast.deleteSuccess.description"),
        });
        router.refresh();
      } else {
        toast({
          title: t("toast.deleteError.title"),
          description: t("toast.deleteError.description"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("toast.unexpectedError.title"),
        description: t("toast.unexpectedError.description"),
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button asChild>
          <Link href="/admin/users/new-agent">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("addAgent")}
          </Link>
        </Button>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-semibold">
              {t("emptyState.title")}
            </h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {searchQuery
                ? t("emptyState.tryDifferentSearch")
                : t("emptyState.getStarted")}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/admin/users/new-agent">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t("addAgent")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteDialog.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("deleteDialog.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAgent}
              className="bg-destructive text-destructive-foreground"
            >
              {t("deleteDialog.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
