// "use client";

// import type React from "react";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "@/components/ui/use-toast";
// import { Upload } from "lucide-react";
// import { useParams } from "next/navigation";
// import { useTranslations } from "next-intl";

// const profileFormSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   phone: z.string().min(10, {
//     message: "Phone number must be at least 10 digits.",
//   }),
//   licenseNumber: z.string().min(5, {
//     message: "License number must be at least 5 characters.",
//   }),
//   licenseExpiry: z.string().min(1, {
//     message: "License expiry date is required.",
//   }),
// });

// type ProfileFormValues = z.infer<typeof profileFormSchema>;

// // Mock profile data
// const defaultValues: ProfileFormValues = {
//   name: "Ahmed Rashid",
//   email: "ahmed.rashid@example.com",
//   phone: "+966 50 123 4567",
//   licenseNumber: "RE-12345-SA",
//   licenseExpiry: "2025-06-30",
// };

// export default function ProfileManagement() {
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const { locale } = useParams();
//   const t = useTranslations();
//   const isRtl = locale === "ar";

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues,
//   });

//   function onSubmit(data: ProfileFormValues) {
//     toast({
//       title: "Profile updated",
//       description: "Your profile information has been updated successfully.",
//     });
//     console.log(data, avatar);
//   }

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setAvatar(file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   // Calculate days until license expiry
//   const today = new Date();
//   const expiryDate = new Date(form.watch("licenseExpiry"));
//   const daysUntilExpiry = Math.ceil(
//     (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
//   );
//   const isExpiryWarning = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
//   const isExpired = daysUntilExpiry <= 0;

//   return (
//     <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">
//           {t("common.profile")}
//         </h2>
//         <p className="text-muted-foreground">{t("profile.updateProfile")}</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>{t("profile.profileInfo")}</CardTitle>
//           <CardDescription>{t("profile.updatePersonal")}</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
//                 <div className="flex flex-col items-center gap-4">
//                   <Avatar className="h-24 w-24 border-2 border-green-500">
//                     <AvatarImage
//                       src={
//                         avatarPreview || "/placeholder.svg?height=96&width=96"
//                       }
//                       alt="Profile"
//                     />
//                     <AvatarFallback>AR</AvatarFallback>
//                   </Avatar>
//                   <div className="flex items-center justify-center">
//                     <label
//                       htmlFor="avatar-upload"
//                       className="flex items-center gap-2 cursor-pointer text-sm text-green-600 hover:text-green-700"
//                     >
//                       <Upload className="h-4 w-4" />
//                       {t("profile.changePhoto")}
//                       <Input
//                         id="avatar-upload"
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleAvatarChange}
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex-1 space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{t("profile.fullName")}</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Your full name"
//                             {...field}
//                             className="focus-visible:ring-green-500"
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           Your name as it appears on your official documents.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>{t("profile.email")}</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="Your email address"
//                               {...field}
//                               className="focus-visible:ring-green-500"
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Your primary contact email.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>{t("profile.phone")}</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Your phone number"
//                               {...field}
//                               className="focus-visible:ring-green-500"
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Your primary contact phone number.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <h3 className="text-lg font-medium mb-4">
//                   License Information
//                 </h3>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="licenseNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{t("profile.licenseNumber")}</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Your real estate license number"
//                             {...field}
//                             className="focus-visible:ring-green-500"
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           Your official real estate license number.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="licenseExpiry"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{t("profile.licenseExpiry")}</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="date"
//                             {...field}
//                             className="focus-visible:ring-green-500"
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           The expiration date of your real estate license.
//                         </FormDescription>
//                         <FormMessage />
//                         {isExpired && (
//                           <p className="text-sm font-medium text-red-500 mt-1">
//                             Your license has expired! Please renew immediately.
//                           </p>
//                         )}
//                         {isExpiryWarning && (
//                           <p className="text-sm font-medium text-yellow-500 mt-1">
//                             Your license expires in {daysUntilExpiry} days.
//                             Please renew soon.
//                           </p>
//                         )}
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   {t("profile.saveChanges")}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Document Uploads</CardTitle>
//           <CardDescription>
//             Upload additional documents related to your real estate license and
//             properties.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6 sm:grid-cols-2">
//             <div className="space-y-2">
//               <h3 className="text-sm font-medium">NOC Documents</h3>
//               <div className="flex items-center justify-center w-full">
//                 <label
//                   htmlFor="noc-upload"
//                   className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
//                 >
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <Upload className="w-8 h-8 mb-2 text-green-500" />
//                     <p className="mb-2 text-sm text-muted-foreground">
//                       <span className="font-semibold">Click to upload</span> or
//                       drag and drop
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       PDF, DOC or DOCX (MAX. 10MB)
//                     </p>
//                   </div>
//                   <Input
//                     id="noc-upload"
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-medium">Deed Copies</h3>
//               <div className="flex items-center justify-center w-full">
//                 <label
//                   htmlFor="deed-upload"
//                   className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
//                 >
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <Upload className="w-8 h-8 mb-2 text-green-500" />
//                     <p className="mb-2 text-sm text-muted-foreground">
//                       <span className="font-semibold">Click to upload</span> or
//                       drag and drop
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       PDF, DOC or DOCX (MAX. 10MB)
//                     </p>
//                   </div>
//                   <Input
//                     id="deed-upload"
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col items-start border-t px-6 py-4">
//           <h3 className="text-sm font-medium">Note:</h3>
//           <p className="text-sm text-muted-foreground">
//             Uploaded documents are only visible to administrators for
//             verification purposes. Please ensure all documents are clear and
//             legible.
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  licenseNumber: z.string().min(5, {
    message: "License number must be at least 5 characters.",
  }),
  licenseExpiry: z.string().min(1, {
    message: "License expiry date is required.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock profile data
const defaultValues: ProfileFormValues = {
  name: "Ahmed Rashid",
  email: "ahmed.rashid@example.com",
  phone: "+966 50 123 4567",
  licenseNumber: "RE-12345-SA",
  licenseExpiry: "2025-06-30",
};

export default function ProfileManagement() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { locale } = useParams();
  const t = useTranslations("userProfile");
  const isRtl = locale === "ar";

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: t("profileUpdated.title"),
      description: t("profileUpdated.description"),
    });
    console.log(data, avatar);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Calculate days until license expiry
  const today = new Date();
  const expiryDate = new Date(form.watch("licenseExpiry"));
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiryWarning = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry <= 0;

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t("profile")}</h2>
        <p className="text-muted-foreground">{t("updateProfile")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("profileInfo")}</CardTitle>
          <CardDescription>{t("updatePersonal")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-green-500">
                    <AvatarImage
                      src={
                        avatarPreview || "/placeholder.svg?height=96&width=96"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center gap-2 cursor-pointer text-sm text-green-600 hover:text-green-700"
                    >
                      <Upload className="h-4 w-4" />
                      {t("changePhoto")}
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fullName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("fullName")}
                            {...field}
                            className="focus-visible:ring-green-500"
                          />
                        </FormControl>
                        <FormDescription>
                          {t("descriptions.name")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email")}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("email")}
                              {...field}
                              className="focus-visible:ring-green-500"
                            />
                          </FormControl>
                          <FormDescription>
                            {t("descriptions.email")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phone")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("phone")}
                              {...field}
                              className="focus-visible:ring-green-500"
                            />
                          </FormControl>
                          <FormDescription>
                            {t("descriptions.phone")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  {t("licenseNumber")}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("licenseNumber")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("licenseNumber")}
                            {...field}
                            className="focus-visible:ring-green-500"
                          />
                        </FormControl>
                        <FormDescription>
                          {t("descriptions.licenseNumber")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("licenseExpiry")}</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="focus-visible:ring-green-500"
                          />
                        </FormControl>
                        <FormDescription>
                          {t("descriptions.licenseExpiry")}
                        </FormDescription>
                        <FormMessage />
                        {isExpired && (
                          <p className="text-sm font-medium text-red-500 mt-1">
                            {t("licenseStatus.expired")}
                          </p>
                        )}
                        {isExpiryWarning && (
                          <p className="text-sm font-medium text-yellow-500 mt-1">
                            {t("licenseStatus.warning", {
                              days: daysUntilExpiry,
                            })}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {t("saveChanges")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("documents.title")}</CardTitle>
          <CardDescription>{t("documents.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("documents.noc")}</h3>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="noc-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-green-500" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      {t("documents.uploadText")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("documents.fileTypes")}
                    </p>
                  </div>
                  <Input
                    id="noc-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("documents.deed")}</h3>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="deed-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-green-500" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      {t("documents.uploadText")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("documents.fileTypes")}
                    </p>
                  </div>
                  <Input
                    id="deed-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t px-6 py-4">
          <h3 className="text-sm font-medium">{t("documents.note")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("documents.noteText")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
