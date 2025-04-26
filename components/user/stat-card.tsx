"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/user/ui/card";
import { Progress } from "@/components/user/ui/progress";

interface StatCardProps {
  title: string;
  value?: string;
  Currency?: React.ReactNode
  icon: ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  progress?: number;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  trend,
  progress,
  Currency
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400">
              {icon}
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{Currency ? <Currency /> : value}</div>
          {change && (
            <div
              className={`text-xs ${
                trend === "up"
                  ? "text-emerald-400"
                  : trend === "down"
                  ? "text-red-400"
                  : "text-muted-foreground"
              }`}
            >
              {change}
            </div>
          )}
          {progress !== undefined && (
            <Progress
              value={progress}
              className="h-2 mt-2 bg-emerald-950/20"
              indicatorClassName="bg-gradient-to-r from-emerald-500 to-green-500"
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
