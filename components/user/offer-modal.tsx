"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/user/ui/dialog";
import { Button } from "@/components/user/ui/button";
import { Input } from "@/components/user/ui/input";
import { Label } from "@/components/user/ui/label";
import { Textarea } from "@/components/user/ui/textarea";

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string | null;
  properties: Property[];
}

export function OfferModal({
  isOpen,
  onClose,
  propertyId,
  properties,
}: OfferModalProps) {
  const [offerAmount, setOfferAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const property = properties.find((p) => p.id === propertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setOfferAmount("");
        setMessage("");
        onClose();
        toast.success("Your offer has been sent successfully!");
      }, 2000);
    }, 1500);
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border border-border/40">
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Send your offer for {property.title} at {property.address}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-6 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-emerald-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your offer has been sent successfully. We'll contact you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="amount">Offer Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter your offer amount"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message to Agent</Label>
                <Textarea
                  id="message"
                  placeholder="Write a message to the agent..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-background/50 min-h-[100px]"
                  required
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-border/40"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Offer"}
                </Button>
              </DialogFooter>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
