"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, MessageSquare, FileText, Video, HelpCircle } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"

export function SupportDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [supportMessage, setSupportMessage] = useState("")

  const supportFormMethods = useForm({
    defaultValues: {
      name: "Admin User",
      email: "admin@example.com",
      subject: "",
      message: "",
      attachment: "",
    },
  })

  const handleSubmitTicket = (data: any) => {
    if (!data.message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      supportFormMethods.reset({
        name: "Admin User",
        email: "admin@example.com",
        subject: "",
        message: "",
        attachment: "",
      })
      toast({
        title: "Support ticket submitted",
        description: "We'll get back to you as soon as possible.",
      })
    }, 1000)
  }

  const faqItems = [
    {
      question: "How do I add a new property?",
      answer:
        "To add a new property, navigate to the Properties section in the sidebar and click on the 'Add Property' button. Fill out the property details form and click 'Create Property' to save it.",
    },
    {
      question: "How do I manage user accounts?",
      answer:
        "You can manage user accounts by going to the Users & Agents section. From there, you can view, edit, or delete user accounts, as well as change user roles and permissions.",
    },
    {
      question: "How do I process payments?",
      answer:
        "Payments can be processed through the Payments section. Make sure you have configured your payment gateway in the Settings > Integrations page before processing payments.",
    },
    {
      question: "How do I export property data?",
      answer:
        "To export property data, go to the Properties section, select the properties you want to export using the checkboxes, and click on the 'Export' button in the actions menu.",
    },
    {
      question: "How do I set up email notifications?",
      answer:
        "Email notifications can be configured in the Settings > Notifications page. You can choose which events trigger email notifications and customize the email templates.",
    },
  ]

  const resources = [
    {
      title: "User Guide",
      description: "Comprehensive guide to using the admin panel",
      icon: <FileText className="h-8 w-8" />,
      link: "#",
      type: "document",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: <Video className="h-8 w-8" />,
      link: "#",
      type: "video",
    },
    {
      title: "Knowledge Base",
      description: "Articles and guides for troubleshooting",
      icon: <HelpCircle className="h-8 w-8" />,
      link: "#",
      type: "kb",
    },
    {
      title: "Live Chat Support",
      description: "Chat with our support team in real-time",
      icon: <MessageSquare className="h-8 w-8" />,
      link: "#",
      type: "chat",
    },
  ]

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Tabs defaultValue="help" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="help">Help Center</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
        <TabsTrigger value="contact">Contact Support</TabsTrigger>
      </TabsList>

      <TabsContent value="help" className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Help Center</CardTitle>
              <CardDescription>Find resources and guides to help you use the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search for help articles..." className="pl-8" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {resources.map((resource) => (
                  <Card key={resource.title} className="overflow-hidden">
                    <CardContent className="p-0">
                      <a href={resource.link} className="block hover:bg-muted/50">
                        <div className="flex items-start gap-4 p-6">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">{resource.icon}</div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
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
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest updates and improvements to the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">New Analytics Dashboard</h3>
                  <Badge>New</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  We've launched a new analytics dashboard with improved visualizations and insights.
                </p>
                <p className="text-xs text-muted-foreground">November 15, 2023</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Enhanced Property Search</h3>
                  <Badge variant="outline">Improved</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  The property search functionality has been enhanced with filters and sorting options.
                </p>
                <p className="text-xs text-muted-foreground">November 10, 2023</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Mobile App Launch</h3>
                  <Badge>New</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our mobile app is now available for iOS and Android devices.
                </p>
                <p className="text-xs text-muted-foreground">November 5, 2023</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick guides to help you get started with the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Set up your profile</h3>
                <p className="text-sm text-muted-foreground">
                  Complete your profile information and set your preferences.
                </p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View Guide
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">2. Add your first property</h3>
                <p className="text-sm text-muted-foreground">Learn how to add and manage property listings.</p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View Guide
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">3. Invite team members</h3>
                <p className="text-sm text-muted-foreground">Add team members and assign roles and permissions.</p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View Guide
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">4. Configure integrations</h3>
                <p className="text-sm text-muted-foreground">Set up integrations with third-party services.</p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="faq" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about using the admin panel</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
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
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  We couldn't find any FAQs matching your search. Try a different search term or browse all FAQs.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get in touch with our support team for assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...supportFormMethods}>
              <form onSubmit={supportFormMethods.handleSubmit(handleSubmitTicket)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" defaultValue="admin@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Subject of your inquiry" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question in detail"
                    rows={5}
                    {...supportFormMethods.register("message")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="attachment" className="text-sm font-medium">
                    Attachment (optional)
                  </label>
                  <Input id="attachment" type="file" />
                  <p className="text-xs text-muted-foreground">
                    Max file size: 10MB. Supported formats: JPG, PNG, PDF.
                  </p>
                </div>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Response time: <span className="font-medium">24-48 hours</span>
            </div>
            <Button type="submit" onClick={handleSubmitTicket} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

