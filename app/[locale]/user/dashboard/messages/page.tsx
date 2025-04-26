"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  Users,
  Clock,
  BarChart3,
  Send,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card } from "@/components/user/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/user/ui/avatar";
import { StatCard } from "@/components/user/stat-card";
import { messages } from "@/components/user/data/messages";
import { useTranslations } from "next-intl";

export default function MessagesPage() {
  const t = useTranslations("MessagesPage");
  const router = useRouter();
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [messageText, setMessageText] = useState("");

  // Get unique senders for conversation list
  const uniqueSenders = Array.from(
    new Set(messages.map((message) => message.sender.id))
  ).map((senderId) => {
    const senderMessages = messages.filter((m) => m.sender.id === senderId);
    return {
      id: senderId,
      name: senderMessages[0].sender.name,
      image: senderMessages[0].sender.image,
      isAgent: senderMessages[0].sender.isAgent,
      lastMessage: senderMessages[0],
      unreadCount: senderMessages.filter((m) => !m.read).length,
    };
  });

  const selectedSender = uniqueSenders.find(
    (sender) => sender.id === activeConversation
  );
  const conversationMessages = activeConversation
    ? messages.filter((m) => m.sender.id === activeConversation)
    : [];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back")}
            </button>
          </Button>
          <h1 className="text-2xl font-bold flex-1">{t("title")}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title={t("stats.totalConversations")}
            value={uniqueSenders.length.toString()}
            icon={<MessageSquare className="h-5 w-5" />}
            change={t("stats.activeThreads")}
            trend="neutral"
          />
          <StatCard
            title={t("stats.unreadMessages")}
            value={messages.filter((m) => !m.read).length.toString()}
            icon={<Users className="h-5 w-5" />}
            change={
              messages.filter((m) => !m.read).length > 0
                ? t("stats.needsAttention")
                : t("stats.allCaughtUp")
            }
            trend={
              messages.filter((m) => !m.read).length > 0 ? "up" : "neutral"
            }
          />
          <StatCard
            title={t("stats.responseRate")}
            value="92%"
            icon={<Clock className="h-5 w-5" />}
            change={t("stats.within24Hours")}
            trend="up"
            progress={92}
          />
          <StatCard
            title={t("stats.engagement")}
            value={t("stats.high")}
            icon={<BarChart3 className="h-5 w-5" />}
            change={t("stats.aboveAverage")}
            trend="up"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Conversation List */}
          <div
            className={`w-full lg:w-80 shrink-0 ${
              activeConversation ? "hidden lg:block" : ""
            }`}
          >
            <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 h-[calc(100vh-240px)] flex flex-col">
              <div className="p-4 border-b border-emerald-500/20">
                <h2 className="font-semibold">{t("conversations")}</h2>
              </div>
              <div className="flex-1 overflow-auto">
                {uniqueSenders.map((sender) => (
                  <div
                    key={sender.id}
                    className={`p-4 border-b border-emerald-500/10 cursor-pointer hover:bg-emerald-500/10 transition-colors ${
                      activeConversation === sender.id
                        ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-l-2 border-l-emerald-500"
                        : ""
                    }`}
                    onClick={() => setActiveConversation(sender.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${sender.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                            {sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {sender.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {sender.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{sender.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              sender.lastMessage.timestamp
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {sender.lastMessage.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          {activeConversation ? (
            <div className="flex-1">
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 h-[calc(100vh-240px)] flex flex-col">
                <div className="p-4 border-b border-emerald-500/20 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden mr-2"
                    onClick={() => setActiveConversation(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${selectedSender?.name.charAt(
                          0
                        )}`}
                      />
                      <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                        {selectedSender?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedSender?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedSender?.isAgent
                          ? t("agent")
                          : t("propertyOwner")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {conversationMessages.map((message) => (
                    <div key={message.id} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${message.sender.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-emerald-950/20 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">
                              {message.subject}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm">
                            {t("sampleReply")}
                          </p>
                        </div>
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=Y" />
                          <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                            Y
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-emerald-500/20">
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 p-3 bg-background/50 border border-emerald-900/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[80px] text-sm resize-none"
                      placeholder={t("messagePlaceholder")}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    ></textarea>
                    <Button className="self-end bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex-1">
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 h-[calc(100vh-240px)] flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("selectConversation.title")}
                  </h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    {t("selectConversation.description")}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}