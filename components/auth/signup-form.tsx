"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  QrCode,
  Upload,
  Phone,
  Info,
  CheckCircle,
  Loader2,
} from "lucide-react";
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
import { motion } from "framer-motion";

// Update the phone regex for Saudi Arabian numbers (starts with +966 or 05)
const phoneRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

const signupSchema = z.object({
  licenseNumber: z.string().min(1, "License number is required"),
  phone: z.string().regex(phoneRegex, "Invalid Saudi phone number format"),
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
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "success"
  >("idle");
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
    // Start verification process
    setVerificationStatus("verifying");

    // Simulate verification delay
    setTimeout(() => {
      setVerificationStatus("success");

      // Navigate after showing success state
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    }, 2000);
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
                                ? "أدخل رقم هاتفك السعودي (مثال: 05XXXXXXXX)"
                                : "Enter your Saudi phone number (e.g., 05XXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "05XXXXXXXX" : "05XXXXXXXX"}
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
                        ? "أدخل رقم هاتفك السعودي بتنسيق 05XXXXXXXX"
                        : "Enter your Saudi phone number in the format 05XXXXXXXX"}
                    </p>
                  </div>

                  <Alert className="bg-blue-500/10 border-primary/20 text-black">
                    <AlertDescription>
                      {isArabic
                        ? "سيتم إرسال رمز التحقق إلى رقم هاتفك السعودي للتحقق من هويتك"
                        : "A verification code will be sent to your Saudi phone number to verify your identity"}
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className={`w-full ${
                      verificationStatus !== "idle" ? "opacity-100" : ""
                    }`}
                    disabled={verificationStatus !== "idle"}
                    style={{
                      opacity: verificationStatus !== "idle" ? 1 : undefined,
                    }}
                  >
                    {verificationStatus === "idle" ? (
                      isArabic ? (
                        "التحقق"
                      ) : (
                        "Verify"
                      )
                    ) : verificationStatus === "verifying" ? (
                      <motion.div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>
                          {isArabic ? "جاري التحقق..." : "Verifying..."}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className="h-4 w-4 text-white" />
                        <span>
                          {isArabic ? "تم التحقق" : "Verification done"}
                        </span>
                      </motion.div>
                    )}
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
                                ? "أدخل رقم هاتفك السعودي (مثال: 05XXXXXXXX)"
                                : "Enter your Saudi phone number (e.g., 05XXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "05XXXXXXXX" : "05XXXXXXXX"}
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
                        ? "أدخل رقم هاتفك السعودي بتنسيق 05XXXXXXXX"
                        : "Enter your Saudi phone number in the format 05XXXXXXXX"}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${
                      verificationStatus !== "idle" ? "opacity-100" : ""
                    }`}
                    disabled={!scannedLicense || verificationStatus !== "idle"}
                    style={{
                      opacity: verificationStatus !== "idle" ? 1 : undefined,
                    }}
                  >
                    {verificationStatus === "idle" ? (
                      isArabic ? (
                        "التحقق"
                      ) : (
                        "Verify"
                      )
                    ) : verificationStatus === "verifying" ? (
                      <motion.div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>
                          {isArabic ? "جاري التحقق..." : "Verifying..."}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className="h-4 w-4 text-white" />
                        <span>
                          {isArabic ? "تم التحقق" : "Verification done"}
                        </span>
                      </motion.div>
                    )}
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
                                ? "أدخل رقم هاتفك السعودي (مثال: 05XXXXXXXX)"
                                : "Enter your Saudi phone number (e.g., 05XXXXXXXX)"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                      placeholder={isArabic ? "05XXXXXXXX" : "05XXXXXXXX"}
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
                        ? "أدخل رقم هاتفك السعودي بتنسيق 05XXXXXXXX"
                        : "Enter your Saudi phone number in the format 05XXXXXXXX"}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${
                      verificationStatus !== "idle" ? "opacity-100" : ""
                    }`}
                    disabled={
                      !form.getValues("licenseNumber") ||
                      verificationStatus !== "idle"
                    }
                    style={{
                      opacity: verificationStatus !== "idle" ? 1 : undefined,
                    }}
                  >
                    {verificationStatus === "idle" ? (
                      isArabic ? (
                        "التحقق"
                      ) : (
                        "Verify"
                      )
                    ) : verificationStatus === "verifying" ? (
                      <motion.div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>
                          {isArabic ? "جاري التحقق..." : "Verifying..."}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className="h-4 w-4 text-white" />
                        <span>
                          {isArabic ? "تم التحقق" : "Verification done"}
                        </span>
                      </motion.div>
                    )}
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
                  ? `تم إرسال رمز التحقق إلى رقم هاتفك السعودي ${form.getValues(
                      "phone"
                    )}`
                  : `A verification code has been sent to your Saudi phone number ${form.getValues(
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
              className={`w-full ${
                verificationStatus !== "idle" ? "opacity-100" : ""
              }`}
              onClick={() => {
                setVerificationStatus("verifying");
                setTimeout(() => {
                  setVerificationStatus("success");
                  setTimeout(() => {
                    router.push("/dashboard");
                  }, 1500);
                }, 2000);
              }}
              disabled={verificationStatus !== "idle"}
              style={{ opacity: verificationStatus !== "idle" ? 1 : undefined }}
            >
              {verificationStatus === "idle" ? (
                isArabic ? (
                  "تأكيد"
                ) : (
                  "Confirm"
                )
              ) : verificationStatus === "verifying" ? (
                <motion.div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isArabic ? "جاري التحقق..." : "Verifying..."}</span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                  <span>{isArabic ? "تم التحقق" : "Verification done"}</span>
                </motion.div>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
