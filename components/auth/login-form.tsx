// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Eye, EyeOff, Loader2 } from "lucide-react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { toast } from "@/components/ui/use-toast"
// import Link from "next/link"
// import { signIn } from "@/lib/auth-client"

// const loginFormSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
//   rememberMe: z.boolean().default(false),
// })

// type LoginFormValues = z.infer<typeof loginFormSchema>

// export function LoginForm() {
//   const router = useRouter()

//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//   })

//   async function onSubmit(data: LoginFormValues) {
//     await signIn.email(
//          {
//            email: data.email, // user email address
//            password: data.password, // user password -> min 8 characters by default
//          },
//          {
//            onRequest: (ctx) => {
//              setIsLoading(true);
//            },
//            onSuccess: (ctx) => {
//              toast({title: "Login Successful"})
//              router.push(`/admin`);
//            },
//            onError: (ctx) => {
//              // display the error message
//              alert(ctx.error.message);
//            },
//          }
//        );
//        setIsLoading(false);
//   }

//   return (
//     <div className="space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your email" {...field} />
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
//                     <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
//                     </Button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex items-center justify-between">
//             <FormField
//               control={form.control}
//               name="rememberMe"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center space-x-2 space-y-0">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <FormLabel className="text-sm font-normal">Remember me</FormLabel>
//                 </FormItem>
//               )}
//             />
//             <Button variant="link" className="px-0 font-normal" type="button">
//               Forgot password?
//             </Button>
//           </div>
//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign in"
//             )}
//           </Button>
//         </form>
//       </Form>
//       <div className="text-center text-sm">
//         <p className="text-muted-foreground">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-primary underline-offset-4 hover:underline">
//             Create an account
//           </Link>
//         </p>
//         <div className="mt-4 text-muted-foreground">
//           <p>Demo credentials:</p>
//           <p>Email: admin@example.com</p>
//           <p>Password: password123</p>
//         </div>
//       </div>
//     </div>
//   )
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/i18n/routing";

// Updated regex for Bangladeshi phone numbers (starts with +880 or 01)
const phoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

const loginSchema = z.object({
  phone: z
    .string()
    .regex(phoneRegex, "Invalid Bangladeshi phone number format"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ locale }: { locale: Locale }) {
  const [step, setStep] = useState<"phone" | "verification">("phone");
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // In a real app, this would call an API to send OTP
    console.log("Form data:", data);
    setStep("verification");
  };

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6">
        {step === "phone" ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            dir={dir}
          >
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

            <Alert className="bg-primary/10 border-primary/20 text-primary-foreground">
              <AlertDescription>
                {isArabic
                  ? "سيتم إرسال رمز التحقق إلى رقم هاتفك البنغلاديشي للتحقق من هويتك"
                  : "A verification code will be sent to your Bangladeshi phone number to verify your identity"}
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full">
              {isArabic ? "إرسال رمز التحقق" : "Send Verification Code"}
            </Button>
          </form>
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
              {isArabic ? "تسجيل الدخول" : "Login"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
