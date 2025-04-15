// "use client";

// import type React from "react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Loader2, Plus, X } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "@/components/ui/use-toast";
// import { createAgent, updateAgent } from "@/lib/actions";
// import { createClient } from "@supabase/supabase-js";
// import { UploadButton } from "./uploadthing";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase =
//   supabaseUrl && supabaseAnonKey
//     ? createClient(supabaseUrl, supabaseAnonKey)
//     : null;

// // Form schema
// const agentFormSchema = z.object({
//   userId: z.string().optional(),
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   phone: z.string().min(5, "Phone number is required"),
//   companyName: z.string().min(2, "Company name is required"),
//   title: z.string().min(2, "Job title is required"),
//   bio: z.string().optional(),
//   website: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   yearsOfExperience: z.coerce.number().int().min(0),
//   propertiesListed: z.coerce.number().int().min(0),
//   propertiesSold: z.coerce.number().int().min(0),
//   propertiesChecked: z.coerce.number().int().min(0),
//   facebook: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   twitter: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   instagram: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   linkedin: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   youtube: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
// });

// type AgentFormValues = z.infer<typeof agentFormSchema>;

// interface AgentFormProps {
//   agent?: any;
//   users?: any[];
// }

// export function AgentForm({ agent, users = [] }: AgentFormProps) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [profileImage, setProfileImage] = useState<string>("");

//   const [languages, setLanguages] = useState<string[]>(
//     agent?.languages?.map((l: any) => l.language) || []
//   );
//   const [newLanguage, setNewLanguage] = useState("");
//   const [badges, setBadges] = useState<string[]>(
//     agent?.badges?.map((b: any) => b.name) || []
//   );
//   const [newBadge, setNewBadge] = useState("");

//   // Default form values
//   const defaultValues: Partial<AgentFormValues> = {
//     userId: agent?.userId || "",
//     firstName: agent?.user?.firstName || "",
//     lastName: agent?.user?.lastName || "",
//     email: agent?.user?.email || "",
//     phone: agent?.phone || "",
//     companyName: agent?.companyName || "",
//     title: agent?.title || "Real Estate Agent",
//     bio: agent?.bio || "",
//     website: agent?.website || "",
//     yearsOfExperience: agent?.yearsOfExperience || 0,
//     propertiesListed: agent?.propertiesListed || 0,
//     propertiesSold: agent?.propertiesSold || 0,
//     propertiesChecked: agent?.propertiesChecked || 0,
//     facebook: agent?.socialMedia?.facebook || "",
//     twitter: agent?.socialMedia?.twitter || "",
//     instagram: agent?.socialMedia?.instagram || "",
//     linkedin: agent?.socialMedia?.linkedin || "",
//     youtube: agent?.socialMedia?.youtube || "",
//   };



//   // Initialize form
//   const form = useForm<AgentFormValues>({
//     resolver: zodResolver(agentFormSchema),
//     defaultValues,
//   });

//   // Prepare form data
//   const formData = new FormData();

  



//   // Add language
//   const addLanguage = () => {
//     if (newLanguage && !languages.includes(newLanguage)) {
//       setLanguages([...languages, newLanguage]);
//       setNewLanguage("");
//     }
//   };

//   // Remove language
//   const removeLanguage = (language: string) => {
//     setLanguages(languages.filter((l) => l !== language));
//   };

//   // Add badge
//   const addBadge = () => {
//     if (newBadge && !badges.includes(newBadge)) {
//       setBadges([...badges, newBadge]);
//       setNewBadge("");
//     }
//   };

//   // Remove badge
//   const removeBadge = (badge: string) => {
//     setBadges(badges.filter((b) => b !== badge));
//   };

//   // Form submission
//   const onSubmit = async (data: AgentFormValues) => {
//     setIsSubmitting(true);

//     try {
//       // Upload profile image if selected
     
//       // Add all form fields to FormData
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           formData.append(key, value.toString());
//         }
//       });

//       if (profileImage) {
//         formData.append("profileImageUrl", profileImage);
//       }

//       // Add languages and badges
//       languages.forEach((language) => {
//         formData.append("languages[]", language);
//       });

//       badges.forEach((badge) => {
//         formData.append("badges[]", badge);
//       });

//       // Add profile image URL if uploaded
     

//       // Submit the form
//       let result;
//       if (agent) {
//         formData.append("id", agent.id);
//         result = await updateAgent(formData);
//       } else {
//         result = await createAgent(formData);
//       }

//       if (result.success) {
//         toast({
//           title: agent ? "Agent updated" : "Agent created",
//           description: agent
//             ? "The agent has been successfully updated."
//             : "The agent has been successfully created.",
//         });
//         router.push("/admin/users");
//         router.refresh();
//       } else {
//         toast({
//           title: "Error",
//           description: `Failed to ${agent ? "update" : "create"} agent. ${
//             result.error || "Please try again."
//           }`,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   console.log("Image::" , profileImage)

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <Tabs defaultValue="basic" className="w-full">
//           <TabsList className="grid w-full max-w-md grid-cols-3">
//             <TabsTrigger value="basic">Basic Info</TabsTrigger>
//             <TabsTrigger value="details">Details</TabsTrigger>
//             <TabsTrigger value="social">Social Media</TabsTrigger>
//           </TabsList>

//           <TabsContent value="basic" className="space-y-4 pt-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Basic Information</CardTitle>
//                 <CardDescription>
//                   Enter the basic information about the agent
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="john.doe@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone</FormLabel>
//                       <FormControl>
//                         <Input placeholder="+1 (555) 123-4567" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="companyName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Company Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Real Estate Company" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Job Title</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Real Estate Agent" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div>
               
//                   <div className="space-y-6">
                
//                     <div className="space-y-4">
//                       <UploadButton
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(res) => {
//                           if (res && res.length > 0) {
//                             const newImageUrl = res[0].ufsUrl; // based on your uploadthing config
//                             setProfileImage(newImageUrl);
//                             console.log("Image Url::", newImageUrl);
//                           }
//                         }}
//                         onUploadError={(error: Error) => {
//                           alert(`ERROR! ${error.message}`);
//                         }}
//                       />

//                       {/* Image preview grid */}
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                         {/* {formData.images.map((url, index) => (
//                           <div key={index} className="relative group">
//                             <img
//                               src={url}
//                               alt={`Uploaded ${index}`}
//                               className="w-full h-40 object-cover rounded"
//                             />
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 setFormData((prev) => ({
//                                   ...prev,
//                                   images: prev.images.filter(
//                                     (_, i) => i !== index
//                                   ),
//                                 }))
//                               }
//                               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 group-hover:opacity-100"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                         ))} */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="bio"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Bio</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Write a short bio about the agent..."
//                           className="min-h-[120px]"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="details" className="space-y-4 pt-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Agent Details</CardTitle>
//                 <CardDescription>
//                   Enter additional details about the agent
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="website"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Website</FormLabel>
//                       <FormControl>
//                         <Input placeholder="https://example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="yearsOfExperience"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Years of Experience</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="propertiesListed"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Properties Listed</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="propertiesSold"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Properties Sold</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="propertiesChecked"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Properties Checked</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div>
//                   <FormLabel>Languages</FormLabel>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Input
//                       placeholder="Add a language..."
//                       value={newLanguage}
//                       onChange={(e) => setNewLanguage(e.target.value)}
//                     />
//                     <Button type="button" onClick={addLanguage} size="sm">
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {languages.map((language, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="flex items-center gap-1"
//                       >
//                         {language}
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="h-4 w-4 p-0 hover:bg-transparent"
//                           onClick={() => removeLanguage(language)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <FormLabel>Badges</FormLabel>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Input
//                       placeholder="Add a badge..."
//                       value={newBadge}
//                       onChange={(e) => setNewBadge(e.target.value)}
//                     />
//                     <Button type="button" onClick={addBadge} size="sm">
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <FormDescription>
//                     Examples: TruBroker™, Quality Lister, Responsive Broker
//                   </FormDescription>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {badges.map((badge, index) => (
//                       <Badge key={index} className="flex items-center gap-1">
//                         {badge}
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="h-4 w-4 p-0 hover:bg-transparent"
//                           onClick={() => removeBadge(badge)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="social" className="space-y-4 pt-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Social Media</CardTitle>
//                 <CardDescription>
//                   Add social media profiles for the agent
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="facebook"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Facebook</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://facebook.com/username"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="twitter"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Twitter</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://twitter.com/username"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="instagram"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Instagram</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://instagram.com/username"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="linkedin"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>LinkedIn</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://linkedin.com/in/username"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="youtube"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>YouTube</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="https://youtube.com/channel/id"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         <CardFooter className="flex justify-between px-0">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.push("/admin/users")}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 {agent ? "Updating..." : "Creating..."}
//               </>
//             ) : agent ? (
//               "Update Agent"
//             ) : (
//               "Create Agent"
//             )}
//           </Button>
//         </CardFooter>
//       </form>
//     </Form>
//   );
// }











"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { createAgent, updateAgent } from "@/lib/actions"
import { UploadButton } from "./uploadthing"

// Form schema
const agentFormSchema = z.object({
  userId: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number is required"),
  companyName: z.string().min(2, "Company name is required"),
  title: z.string().min(2, "Job title is required"),
  bio: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  yearsOfExperience: z.coerce.number().int().min(0),
  propertiesListed: z.coerce.number().int().min(0),
  propertiesSold: z.coerce.number().int().min(0),
  propertiesChecked: z.coerce.number().int().min(0),
  facebook: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  youtube: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type AgentFormValues = z.infer<typeof agentFormSchema>

interface AgentFormProps {
  agent?: any
  users?: any[]
}

export function AgentForm({ agent, users = [] }: AgentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string>(agent?.profileImageUrl || "")

  const [languages, setLanguages] = useState<string[]>(agent?.languages?.map((l: any) => l.language) || [])
  const [newLanguage, setNewLanguage] = useState("")
  const [badges, setBadges] = useState<string[]>(agent?.badges?.map((b: any) => b.name) || [])
  const [newBadge, setNewBadge] = useState("")

  // Default form values
  const defaultValues: Partial<AgentFormValues> = {
    userId: agent?.userId || "",
    firstName: agent?.user?.firstName || "",
    lastName: agent?.user?.lastName || "",
    email: agent?.user?.email || "",
    phone: agent?.phone || "",
    companyName: agent?.companyName || "",
    title: agent?.title || "Real Estate Agent",
    bio: agent?.bio || "",
    website: agent?.website || "",
    yearsOfExperience: agent?.yearsOfExperience || 0,
    propertiesListed: agent?.propertiesListed || 0,
    propertiesSold: agent?.propertiesSold || 0,
    propertiesChecked: agent?.propertiesChecked || 0,
    facebook: agent?.socialMedia?.facebook || "",
    twitter: agent?.socialMedia?.twitter || "",
    instagram: agent?.socialMedia?.instagram || "",
    linkedin: agent?.socialMedia?.linkedin || "",
    youtube: agent?.socialMedia?.youtube || "",
  }

  // Initialize form
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues,
  })

  // Prepare form data
  const formData = new FormData()

  // Add language
  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage])
      setNewLanguage("")
    }
  }

  // Remove language
  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((l) => l !== language))
  }

  // Add badge
  const addBadge = () => {
    if (newBadge && !badges.includes(newBadge)) {
      setBadges([...badges, newBadge])
      setNewBadge("")
    }
  }

  // Remove badge
  const removeBadge = (badge: string) => {
    setBadges(badges.filter((b) => b !== badge))
  }

  // Form submission
  const onSubmit = async (data: AgentFormValues) => {
    setIsSubmitting(true)

    try {
      // Image is already uploaded via UploadThing
      // We just need to include the URL in the form data

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })

      // Add profile image URL
      if (profileImage) {
        formData.append("profileImageUrl", profileImage)
      }

      // Add languages and badges
      languages.forEach((language) => {
        formData.append("languages[]", language)
      })

      badges.forEach((badge) => {
        formData.append("badges[]", badge)
      })

      // Add profile image URL if uploaded

      // Submit the form
      let result
      if (agent) {
        formData.append("id", agent.id)
        result = await updateAgent(formData)
      } else {
        result = await createAgent(formData)
      }

      if (result.success) {
        toast({
          title: agent ? "Agent updated" : "Agent created",
          description: agent ? "The agent has been successfully updated." : "The agent has been successfully created.",
        })
        router.push("/admin/users")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: `Failed to ${agent ? "update" : "create"} agent. ${result.error || "Please try again."}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log("Image::", profileImage)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic information about the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Profile Image</FormLabel>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            if (res && res.length > 0) {
                              // Get the URL from UploadThing response
                              // const newImageUrl = res[0].url || res[0].fileUrl || res[0].ufsUrl
                              const newImageUrl = res[0].ufsUrl;
                              setProfileImage(newImageUrl)
                              toast({
                                title: "Image uploaded",
                                description: "Your profile image has been uploaded successfully.",
                              })
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              title: "Upload failed",
                              description: error.message,
                              variant: "destructive",
                            })
                          }}
                        />

                        {/* Image preview */}
                        {profileImage && (
                          <div className="mt-4">
                            <div className="relative w-40 h-40 rounded-md overflow-hidden border">
                              <img
                                src={profileImage || "/placeholder.svg"}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => setProfileImage("")}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Show existing profile image if editing */}
                        {!profileImage && agent?.profileImageUrl && (
                          <div className="mt-4">
                            <div className="relative w-40 h-40 rounded-md overflow-hidden border">
                              <img
                                src={agent.profileImageUrl || "/placeholder.svg"}
                                alt="Current profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Current profile image</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short bio about the agent..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Details</CardTitle>
                <CardDescription>Enter additional details about the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertiesListed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Properties Listed</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="propertiesSold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Properties Sold</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertiesChecked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Properties Checked</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Languages</FormLabel>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      placeholder="Add a language..."
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                    />
                    <Button type="button" onClick={addLanguage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {language}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeLanguage(language)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <FormLabel>Badges</FormLabel>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      placeholder="Add a badge..."
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                    />
                    <Button type="button" onClick={addBadge} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription>Examples: TruBroker™, Quality Lister, Responsive Broker</FormDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {badges.map((badge, index) => (
                      <Badge key={index} className="flex items-center gap-1">
                        {badge}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeBadge(badge)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Add social media profiles for the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/channel/id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between px-0">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/users")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {agent ? "Updating..." : "Creating..."}
              </>
            ) : agent ? (
              "Update Agent"
            ) : (
              "Create Agent"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
