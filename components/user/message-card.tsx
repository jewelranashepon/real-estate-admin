"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card, CardContent } from "@/components/user/ui/card";
import { Badge } from "@/components/user/ui/badge";
import { Textarea } from "@/components/user/ui/textarea";
import type { Message } from "@/components/user/data/messages";

interface MessageCardProps {
  message: Message;
  gradientClass: string;
  onReply: () => void;
}

export function MessageCard({
  message,
  gradientClass,
  onReply,
}: MessageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (isReplying && replyText.trim()) {
      onReply();
      setIsReplying(false);
      setReplyText("");
    } else {
      setIsReplying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className="mb-4"
    >
      <Card
        className={`overflow-hidden ${gradientClass} backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-900/5`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              {message.sender.image ? (
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=${encodeURIComponent(
                    message.sender.name.charAt(0)
                  )}`}
                  alt={message.sender.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-semibold">
                  {message.sender.name.charAt(0)}
                </div>
              )}
              {!message.read && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{message.sender.name}</h3>
                  {message.sender.isAgent && (
                    <Badge className="ml-2 bg-gradient-to-r from-emerald-500/80 to-green-500/80 backdrop-blur-sm border-0 text-xs">
                      Agent
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(message.timestamp), "MMM d, h:mm a")}
                </span>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-medium">{message.subject}</h4>
                <p
                  className={`text-sm text-muted-foreground ${
                    isExpanded ? "" : "line-clamp-2"
                  }`}
                >
                  {message.content}
                </p>
              </div>

              {message.propertyId && (
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>Regarding property #{message.propertyId}</span>
                </div>
              )}

              <AnimatePresence>
                {isReplying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 mb-3"
                  >
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-background/50 border-emerald-900/20 min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsReplying(false)}
                        className="border-emerald-900/20 bg-emerald-950/10 hover:bg-emerald-950/20 text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleReply}
                        className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs px-2 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-900/20 bg-emerald-950/10 hover:bg-emerald-950/20 text-xs"
                  onClick={handleReply}
                >
                  Reply
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
