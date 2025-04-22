// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "@/i18n/navigation";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { toast } from "@/components/ui/use-toast";
// import { Link } from "@/i18n/navigation";
// import { signUp } from "@/lib/auth-client";

// const registerFormSchema = z
//   .object({
//     name: z.string().min(2, {
//       message: "Name must be at least 2 characters.",
//     }),
//     email: z.string().email({
//       message: "Please enter a valid email address.",
//     }),
//     password: z.string().min(8, {
//       message: "Password must be at least 8 characters.",
//     }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type RegisterFormValues = z.infer<typeof registerFormSchema>;

// export function RegisterForm() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   async function onSubmit(data: RegisterFormValues) {
//     await signUp.email(
//       {
//         name: data.name, // user display name
//         email: data.email, // user email address
//         password: data.password, // user password -> min 8 characters by default
//       },
//       {
//         onRequest: (ctx) => {
//           setIsLoading(true);
//         },
//         onSuccess: (ctx) => {
//           toast({ title: "Registration Successful" });
//           router.push("/admin");
//         },
//         onError: (ctx) => {
//           // display the error message
//           alert(ctx.error.message);
//         },
//       }
//     );
//     setIsLoading(false);
//   }

//   return (
//     <div className="space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="john.doe@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="••••••••"
//                       {...field}
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                       <span className="sr-only">
//                         {showPassword ? "Hide password" : "Show password"}
//                       </span>
//                     </Button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="••••••••"
//                       {...field}
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                       <span className="sr-only">
//                         {showConfirmPassword
//                           ? "Hide password"
//                           : "Show password"}
//                       </span>
//                     </Button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Creating account...
//               </>
//             ) : (
//               "Create Account"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="text-center text-sm">
//         <p className="text-muted-foreground">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-primary underline-offset-4 hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Upload, Phone, Info } from "lucide-react";
import { QrScanner } from "./qr-scanner";
import { FileUpload } from "@/components/auth/file-upload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocale } from "next-intl";

// Updated regex for Bangladeshi phone numbers (starts with +880 or 01)
const phoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

const signupSchema = z.object({
  licenseNumber: z.string().min(1, "License number is required"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid Bangladeshi phone number format"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [step, setStep] = useState<"license" | "verification">("license");
  const [verificationMethod, setVerificationMethod] = useState<
    "qr" | "manual" | "upload"
  >("manual");
  const [scannedLicense, setScannedLicense] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      licenseNumber: "",
      phone: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    // In a real app, this would call an API to verify the license and phone
    console.log("Form data:", data);
    setStep("verification");
  };

  const handleQrSuccess = (result: string) => {
    setScannedLicense(result);
    form.setValue("licenseNumber", result);
  };

  const handleFileUploadSuccess = (licenseId: string) => {
    form.setValue("licenseNumber", licenseId);
  };

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6">
        {step === "license" ? (
          <div className="space-y-4" dir={dir}>
            <Tabs
              defaultValue="manual"
              onValueChange={(v) => setVerificationMethod(v as any)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{isArabic ? "يدوي" : "Manual"}</span>
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span>{isArabic ? "مسح QR" : "Scan QR"}</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>{isArabic ? "تحميل" : "Upload"}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="manual" className="space-y-4 pt-4">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {isArabic ? "الاسم الكامل" : "Full Name"}
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder={
                        isArabic ? "أدخل اسمك الكامل" : "Enter your full name"
                      }
                      className={
                        form.formState.errors.name ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder={
                        isArabic
                          ? "أدخل بريدك الإلكتروني"
                          : "Enter your email address"
                      }
                      className={
                        form.formState.errors.email ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="licenseNumber"
                      className="flex items-center gap-2"
                    >
                      {isArabic ? "رقم الترخيص" : "License Number"}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {isArabic
                                ? "أدخل رقم ترخيص FAL الخاص بك للتحقق من هويتك كوكيل عقاري معتمد"
                                : "Enter your FAL license number to verify your identity as a certified real estate agent"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="licenseNumber"
                      {...form.register("licenseNumber")}
                      placeholder={
                        isArabic ? "أدخل رقم الترخيص" : "Enter license number"
                      }
                      className={
                        form.formState.errors.licenseNumber
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {form.formState.errors.licenseNumber && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.licenseNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {isArabic
                                ? "أدخل رقم هاتفك البنغلاديشي (مثال: 01XXXXXXXXX)"
                                : "Enter your Bangladeshi phone number (e.g., 01XXXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                      className={
                        form.formState.errors.phone ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {isArabic
                        ? "أدخل رقم هاتفك البنغلاديشي بتنسيق 01XXXXXXXXX"
                        : "Enter your Bangladeshi phone number in the format 01XXXXXXXXX"}
                    </p>
                  </div>

                  <Alert className="bg-blue-500/10 border-primary/20 text-black">
                    <AlertDescription>
                      {isArabic
                        ? "سيتم إرسال رمز التحقق إلى رقم هاتفك البنغلاديشي للتحقق من هويتك"
                        : "A verification code will be sent to your Bangladeshi phone number to verify your identity"}
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full">
                    {isArabic ? "التحقق" : "Verify"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="qr" className="space-y-4 pt-4">
                <QrScanner onSuccess={handleQrSuccess} />
                {scannedLicense && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">
                      {isArabic ? "تم مسح الترخيص:" : "License scanned:"}
                    </p>
                    <p className="text-sm">{scannedLicense}</p>
                  </div>
                )}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {isArabic ? "الاسم الكامل" : "Full Name"}
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder={
                        isArabic ? "أدخل اسمك الكامل" : "Enter your full name"
                      }
                      className={
                        form.formState.errors.name ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder={
                        isArabic
                          ? "أدخل بريدك الإلكتروني"
                          : "Enter your email address"
                      }
                      className={
                        form.formState.errors.email ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {isArabic
                                ? "أدخل رقم هاتفك البنغلاديشي (مثال: 01XXXXXXXXX)"
                                : "Enter your Bangladeshi phone number (e.g., 01XXXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                      className={
                        form.formState.errors.phone ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {isArabic
                        ? "أدخل رقم هاتفك البنغلاديشي بتنسيق 01XXXXXXXXX"
                        : "Enter your Bangladeshi phone number in the format 01XXXXXXXXX"}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!scannedLicense}
                  >
                    {isArabic ? "التحقق" : "Verify"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4 pt-4">
                <FileUpload onSuccess={handleFileUploadSuccess} />
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {isArabic ? "الاسم الكامل" : "Full Name"}
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder={
                        isArabic ? "أدخل اسمك الكامل" : "Enter your full name"
                      }
                      className={
                        form.formState.errors.name ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder={
                        isArabic
                          ? "أدخل بريدك الإلكتروني"
                          : "Enter your email address"
                      }
                      className={
                        form.formState.errors.email ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {isArabic
                                ? "أدخل رقم هاتفك البنغلاديشي (مثال: 01XXXXXXXXX)"
                                : "Enter your Bangladeshi phone number (e.g., 01XXXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                      className={
                        form.formState.errors.phone ? "border-destructive" : ""
                      }
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {isArabic
                        ? "أدخل رقم هاتفك البنغلاديشي بتنسيق 01XXXXXXXXX"
                        : "Enter your Bangladeshi phone number in the format 01XXXXXXXXX"}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!form.getValues("licenseNumber")}
                  >
                    {isArabic ? "التحقق" : "Verify"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-4" dir={dir}>
            <div className="rounded-md bg-primary/10 border border-primary/20 p-4">
              <h3 className="font-medium text-primary">
                {isArabic ? "التحقق من رقم الهاتف" : "Phone Verification"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isArabic
                  ? `تم إرسال رمز التحقق إلى رقم هاتفك البنغلاديشي ${form.getValues(
                      "phone"
                    )}`
                  : `A verification code has been sent to your Bangladeshi phone number ${form.getValues(
                      "phone"
                    )}`}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">
                {isArabic ? "رمز التحقق" : "Verification Code"}
              </Label>
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Input
                    key={i}
                    className="text-center text-lg font-medium"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {isArabic
                  ? "لم تستلم الرمز؟ إعادة الإرسال بعد 30 ثانية"
                  : "Didn't receive the code? Resend after 30 seconds"}
              </p>
            </div>

            <Button
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              {isArabic ? "تأكيد" : "Confirm"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
