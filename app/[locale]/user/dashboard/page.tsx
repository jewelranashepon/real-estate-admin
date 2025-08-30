"use client";

import { Badge } from "@/components/user/ui/badge";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Heart, Search, MessageSquare, User, Filter } from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card } from "@/components/user/ui/card";
import {
  properties,
  defaultSearchFilters,
  savedSearches,
} from "@/components/user/data/properties";
import type { SearchFilters } from "@/components/user/data/properties";
import { messages } from "@/components/user/data/messages";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/user/ui/tabs";
import { StatCard } from "@/components/user/stat-card";
import { PropertyCard } from "@/components/user/property-card";
import { OfferModal } from "@/components/user/offer-modal";
import { SearchModal } from "@/components/user/search-modal";
import { MessageCard } from "@/components/user/message-card";

export default function Dashboard() {
  const router = useRouter();
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [savedProperties, setSavedProperties] = useState<string[]>([
    "1",
    "3",
    "5",
  ]);
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultSearchFilters);
  const [recentSearches, setRecentSearches] =
    useState<SearchFilters[]>(savedSearches);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );

  const openModal = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setIsModalOpen(true);
  };

  const toggleSaveProperty = (propertyId: string) => {
    setSavedProperties((prev) => {
      if (prev.includes(propertyId)) {
        toast.info("Property removed from your favorites");
        return prev.filter((id) => id !== propertyId);
      } else {
        toast.success("Property saved to your favorites!");
        return [...prev, propertyId];
      }
    });
  };

  const handleSearch = (filters: SearchFilters) => {
    // Add to recent searches if it's a new search
    if (JSON.stringify(filters) !== JSON.stringify(defaultSearchFilters)) {
      setRecentSearches((prev) => {
        const newSearches = [filters, ...prev.slice(0, 4)];
        return newSearches;
      });
    }

    setSearchFilters(filters);
    setIsSearchModalOpen(false);

    // Navigate to search page with filters
    router.push("/user/dashboard/search");
  };

  const navigateToSavedProperties = () => {
    router.push("/user/dashboard/saved");
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("common.dashboard")}</h1>
          <Button
            className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            {t("userDashboard.newSearch")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title={t("common.savedProperties")}
            value={savedProperties.length.toString()}
            icon={<Heart className="h-5 w-5" />}
            change={
              savedProperties.length > 0
                ? `+${savedProperties.length} ${t(
                    "userDashboard.fromLastMonth"
                  )}`
                : "No saved properties"
            }
            trend={savedProperties.length > 0 ? "up" : "neutral"}
          />
          <StatCard
            title={t("userDashboard.resentSearches")}
            value={recentSearches.length.toString()}
            icon={<Search className="h-5 w-5" />}
            change={
              recentSearches.length > 0
                ? `+${recentSearches.length} ${t("userDashboard.fromLastWeek")}`
                : "No recent searches"
            }
            trend={recentSearches.length > 0 ? "up" : "neutral"}
          />
          <StatCard
            title={t("userDashboard.unreadMessages")}
            value={messages.filter((m) => !m.read).length.toString()}
            icon={<MessageSquare className="h-5 w-5" />}
            change={`${messages.filter((m) => !m.read).length} ${t(
              "userDashboard.newToday"
            )}`}
            trend="up"
          />
          <StatCard
            title={t("userDashboard.profileCompletion")}
            value="75%"
            icon={<User className="h-5 w-5" />}
            progress={75}
          />
        </div>

        <Tabs defaultValue="saved" className="mb-8">
          <TabsList className="bg-background/30 backdrop-blur-md border border-border/40 mb-6">
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-green-500/20 data-[state=active]:border data-[state=active]:border-emerald-500/30"
            >
              {t("common.SP")}
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-green-500/20 data-[state=active]:border data-[state=active]:border-emerald-500/30"
            >
              {t("common.RS")}
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-green-500/20 data-[state=active]:border data-[state=active]:border-emerald-500/30"
            >
              {t("common.Messages")}
            </TabsTrigger>
          </TabsList>

          {/* Saved Properties Tab */}
          <TabsContent value="saved" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.length > 0 ? (
                <>
                  <div className="col-span-full flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{t("common.YSP")}</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={navigateToSavedProperties}
                      className="border-emerald-800/30 bg-emerald-950/10"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {t("common.VAS")}
                    </Button>
                  </div>
                  {properties
                    .filter((property) => savedProperties.includes(property.id))
                    .slice(0, 3)
                    .map((property, index) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onOfferClick={() => openModal(property.id)}
                        isSaved={true}
                        onToggleSave={() => toggleSaveProperty(property.id)}
                        gradientClass="bg-emerald-50/10"
                      />
                    ))}
                </>
              ) : (
                <>
                  <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 p-6 col-span-3 flex flex-col items-center justify-center py-12">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mb-4">
                      <Heart className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No saved properties yet
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Browse our listings and save properties you like to view
                      them later.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                      onClick={() => router.push("/search")}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Browse Properties
                    </Button>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Recent Searches Tab */}
          <TabsContent value="recent" className="mt-0">
            {recentSearches.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{t("common.RS")}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSearchModalOpen(true)}
                    className="border-emerald-800/30 bg-emerald-950/10"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {t("common.NS")}
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {recentSearches.map((search, index) => (
                    <Card
                      key={index}
                      className={`bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 p-5 hover:shadow-lg transition-shadow`}
                      onClick={() => {
                        setSearchFilters(search);
                        router.push("/search");
                      }}
                    >
                      <div className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium mb-1">
                            {search.searchTerm
                              ? `"${search.searchTerm}"`
                              : `Search #${index + 1}`}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {search.propertyType && (
                              <Badge
                                variant="outline"
                                className="bg-emerald-950/20 border-emerald-900/20"
                              >
                                {search.propertyType}
                              </Badge>
                            )}
                            {search.beds !== null && (
                              <Badge
                                variant="outline"
                                className="bg-emerald-950/20 border-emerald-900/20"
                              >
                                {search.beds}+ beds
                              </Badge>
                            )}
                            {search.baths !== null && (
                              <Badge
                                variant="outline"
                                className="bg-emerald-950/20 border-emerald-900/20"
                              >
                                {search.baths}+ baths
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className="bg-emerald-950/20 border-emerald-900/20"
                            >
                              <span className="icon-jod"></span>{" "}
                              {search.priceRange[0]} -{" "}
                              <span className="icon-jod"></span>
                              {search.priceRange[1]}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-emerald-400"
                        >
                          {t("SearchPage.viewResults")}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 p-6 flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No recent searches
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Start searching for properties to see your recent searches
                  here.
                </p>
                <Button
                  className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                  onClick={() => setIsSearchModalOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Start Searching
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-0">
            {activeConversation ? (
              <div className="space-y-4">
                <div className="flex items-center mb-6">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveConversation(null)}
                    className="mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back
                  </Button>
                  <h2 className="text-xl font-semibold">
                    Conversation with{" "}
                    {messages.find((m) => m.id === activeConversation)?.sender
                      .name || "Agent"}
                  </h2>
                </div>

                <div className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 rounded-lg p-4 mb-4">
                  {messages
                    .filter((m) => m.id === activeConversation)
                    .map((message) => (
                      <div key={message.id} className="mb-6">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-semibold flex-shrink-0">
                            {message.sender.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {message.sender.name}
                              </p>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <h3 className="text-sm font-medium mt-1">
                              {message.subject}
                            </h3>
                            <p className="text-sm mt-1">{message.content}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 pl-12">
                          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-semibold flex-shrink-0">
                            Y
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">You</p>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date().toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm mt-1">
                              Thank you for your message. I'm very interested in
                              this property and would like to schedule a
                              viewing. Is it possible to see it this weekend?
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 rounded-lg p-4">
                  <textarea
                    className="w-full p-3 bg-background/50 border border-emerald-900/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[100px] text-sm"
                    placeholder="Type your message here..."
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    gradientClass="bg-emerald-50/10"
                    onReply={() => setActiveConversation(message.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 p-6 flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  When you receive messages from agents or property owners, they
                  will appear here.
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((property) => property.isFeatured)
              .map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOfferClick={() => openModal(property.id)}
                  isSaved={savedProperties.includes(property.id)}
                  onToggleSave={() => toggleSaveProperty(property.id)}
                  gradientClass="bg-emerald-50/10"
                />
              ))}
          </div>
        </div>
      </motion.div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={selectedProperty}
        properties={properties}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
        initialFilters={searchFilters}
      />
    </div>
  );
}
