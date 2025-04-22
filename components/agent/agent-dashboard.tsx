"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider } from "@/components/ui/sidebar"
import AgentSidebar from "@/components/agent/agent-sidebar"
import AgentHeader from "@/components/agent/agent-header"
import DashboardOverview from "@/components/agent/dashboard-overview"
import PropertyList from "@/components/agent/property-list"
import PropertyForm from "@/components/agent/property-form"
import PropertyMap from "@/components/agent/property-map"
import ProfileManagement from "@/components/agent/profile-management"
import NotificationCenter from "@/components/agent/notification-center"

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AgentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AgentHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="add-property">Add Property</TabsTrigger>
                <TabsTrigger value="map">Property Map</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <DashboardOverview />
              </TabsContent>

              <TabsContent value="properties" className="mt-0">
                <PropertyList />
              </TabsContent>

              <TabsContent value="add-property" className="mt-0">
                <PropertyForm />
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <PropertyMap />
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <ProfileManagement />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <NotificationCenter />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
