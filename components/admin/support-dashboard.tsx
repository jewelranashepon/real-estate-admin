"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  MessageSquare,
  FileText,
  Video,
  HelpCircle,
} from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

export function SupportDashboard() {
  const t = useTranslations("dashboard.supportDashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const supportFormMethods = useForm({
    defaultValues: {
      name: t("contactForm.defaultName"),
      email: t("contactForm.defaultEmail"),
      subject: "",
      message: "",
      attachment: "",
    },
  });

  const handleSubmitTicket = (data: any) => {
    if (!data.message.trim()) {
      toast({
        title: t("toast.error.title"),
        description: t("toast.error.description"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      supportFormMethods.reset({
        name: t("contactForm.defaultName"),
        email: t("contactForm.defaultEmail"),
        subject: "",
        message: "",
        attachment: "",
      });
      toast({
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });
    }, 1000);
  };

  const faqItems = [
    {
      question: t("faq.addProperty.question"),
      answer: t("faq.addProperty.answer"),
    },
    {
      question: t("faq.manageUsers.question"),
      answer: t("faq.manageUsers.answer"),
    },
    {
      question: t("faq.processPayments.question"),
      answer: t("faq.processPayments.answer"),
    },
    {
      question: t("faq.exportData.question"),
      answer: t("faq.exportData.answer"),
    },
    {
      question: t("faq.emailNotifications.question"),
      answer: t("faq.emailNotifications.answer"),
    },
  ];

  const resources = [
    {
      title: t("resources.userGuide.title"),
      description: t("resources.userGuide.description"),
      icon: <FileText className="h-8 w-8" />,
      link: "#",
      type: "document",
    },
    {
      title: t("resources.videoTutorials.title"),
      description: t("resources.videoTutorials.description"),
      icon: <Video className="h-8 w-8" />,
      link: "#",
      type: "video",
    },
    {
      title: t("resources.knowledgeBase.title"),
      description: t("resources.knowledgeBase.description"),
      icon: <HelpCircle className="h-8 w-8" />,
      link: "#",
      type: "kb",
    },
    {
      title: t("resources.liveChat.title"),
      description: t("resources.liveChat.description"),
      icon: <MessageSquare className="h-8 w-8" />,
      link: "#",
      type: "chat",
    },
  ];

  const updates = [
    {
      title: t("updates.analytics.title"),
      description: t("updates.analytics.description"),
      date: t("updates.analytics.date"),
      badge: "new",
    },
    {
      title: t("updates.propertySearch.title"),
      description: t("updates.propertySearch.description"),
      date: t("updates.propertySearch.date"),
      badge: "improved",
    },
    {
      title: t("updates.mobileApp.title"),
      description: t("updates.mobileApp.description"),
      date: t("updates.mobileApp.date"),
      badge: "new",
    },
  ];

  const gettingStarted = [
    {
      title: t("gettingStarted.profile.title"),
      description: t("gettingStarted.profile.description"),
    },
    {
      title: t("gettingStarted.addProperty.title"),
      description: t("gettingStarted.addProperty.description"),
    },
    {
      title: t("gettingStarted.inviteTeam.title"),
      description: t("gettingStarted.inviteTeam.description"),
    },
    {
      title: t("gettingStarted.integrations.title"),
      description: t("gettingStarted.integrations.description"),
    },
  ];

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Tabs defaultValue="help" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="help">{t("tabs.helpCenter")}</TabsTrigger>
        <TabsTrigger value="faq">{t("tabs.faq")}</TabsTrigger>
        <TabsTrigger value="contact">{t("tabs.contact")}</TabsTrigger>
      </TabsList>

      <TabsContent value="help" className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("helpCenter.title")}</CardTitle>
              <CardDescription>{t("helpCenter.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("helpCenter.searchPlaceholder")}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {resources.map((resource) => (
                  <Card key={resource.title} className="overflow-hidden">
                    <CardContent className="p-0">
                      <a
                        href={resource.link}
                        className="block hover:bg-muted/50"
                      >
                        <div className="flex items-start gap-4 p-6">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">
                            {resource.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("updates.title")}</CardTitle>
              <CardDescription>{t("updates.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {updates.map((update, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{update.title}</h3>
                    <Badge
                      variant={update.badge === "new" ? "default" : "outline"}
                    >
                      {update.badge === "new"
                        ? t("updates.newBadge")
                        : t("updates.improvedBadge")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {update.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{update.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("gettingStarted.title")}</CardTitle>
              <CardDescription>
                {t("gettingStarted.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gettingStarted.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    {t("gettingStarted.viewGuide")}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="faq" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("faq.title")}</CardTitle>
            <CardDescription>{t("faq.description")}</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("faq.searchPlaceholder")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  {t("faq.noResults.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("faq.noResults.description")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("contactForm.title")}</CardTitle>
            <CardDescription>{t("contactForm.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...supportFormMethods}>
              <form
                onSubmit={supportFormMethods.handleSubmit(handleSubmitTicket)}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contactForm.nameLabel")}
                    </label>
                    <Input
                      id="name"
                      placeholder={t("contactForm.namePlaceholder")}
                      defaultValue={t("contactForm.defaultName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contactForm.emailLabel")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contactForm.emailPlaceholder")}
                      defaultValue={t("contactForm.defaultEmail")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("contactForm.subjectLabel")}
                  </label>
                  <Input
                    id="subject"
                    placeholder={t("contactForm.subjectPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contactForm.messageLabel")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("contactForm.messagePlaceholder")}
                    rows={5}
                    {...supportFormMethods.register("message")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="attachment" className="text-sm font-medium">
                    {t("contactForm.attachmentLabel")}
                  </label>
                  <Input id="attachment" type="file" />
                  <p className="text-xs text-muted-foreground">
                    {t("contactForm.attachmentDescription")}
                  </p>
                </div>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {t("contactForm.responseTime")}
            </div>
            <Button
              type="submit"
              onClick={handleSubmitTicket}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("contactForm.submitting")}
                </>
              ) : (
                t("contactForm.submitButton")
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
