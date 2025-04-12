// "use client"

// import { useState } from "react"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
// import { useTranslations } from "next-intl"

// const messageSchema = z.object({
//   sender: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   subject: z.string().min(5, "Subject must be at least 5 characters"),
//   message: z.string().min(10, "Message must be at least 10 characters"),
// })

// type MessageFormValues = z.infer<typeof messageSchema>

// interface PropertyMessageFormProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   propertyId: string
//   propertyName: string
// }

// export function PropertyMessageForm({ open, onOpenChange, propertyId, propertyName }: PropertyMessageFormProps) {
//   const t = useTranslations("app.property")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<MessageFormValues>({
//     resolver: zodResolver(messageSchema),
//     defaultValues: {
//       sender: "",
//       email: "",
//       subject: `Inquiry about property #${propertyId}`,
//       message: `I'm interested in this property and would like more information.`,
//     },
//   })

//   async function onSubmit(data: MessageFormValues) {
//     setIsSubmitting(true)
//     try {
//       const response = await fetch("/api/messages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...data,
//           propertyId,
//           propertyName,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to send message")
//       }

//       toast({
//         title: t("messageSent"),
//         description: t("messageConfirmation"),
//       })

//       form.reset()
//       onOpenChange(false)
//     } catch (error) {
//       console.error("Error sending message:", error)
//       toast({
//         title: t("messageError"),
//         description: t("messageTryAgain"),
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>{t("contactAgent")}</DialogTitle>
//           <DialogDescription>{t("propertyInquiry")}</DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="sender"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("name")}</FormLabel>
//                   <FormControl>
//                     <Input placeholder={t("yourName")} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("email")}</FormLabel>
//                   <FormControl>
//                     <Input placeholder={t("yourEmail")} type="email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="subject"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("subject")}</FormLabel>
//                   <FormControl>
//                     <Input placeholder={t("messageSubject")} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("message")}</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder={t("yourMessage")} className="min-h-[120px]" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter className="mt-6">
//               <DialogClose asChild>
//                 <Button type="button" variant="outline">
//                   {t("cancel")}
//                 </Button>
//               </DialogClose>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? t("sending") : t("sendMessage")}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }












"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const messageSchema = z.object({
  sender: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface PropertyMessageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  propertyName: string;
}

export function PropertyMessageForm({
  open,
  onOpenChange,
  propertyId,
  propertyName,
}: PropertyMessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      sender: "",
      email: "",
      subject: `Inquiry about property #${propertyId}`,
      message: `I'm interested in this property and would like more information.`,
    },
  });

  async function onSubmit(data: MessageFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          propertyId,
          propertyName,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent",
        description: "Your inquiry has been successfully sent to the agent.",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Agent</DialogTitle>
          <DialogDescription>
            Please fill in the form below to inquire about this property.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Inquiry about the property" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide more details about the property..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
