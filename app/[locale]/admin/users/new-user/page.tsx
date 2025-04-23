"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormFieldset,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { signUp } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

// Validation Schema
const createUserSchema = yup.object().shape({
  name: yup.string().required("nameRequired"),
  email: yup.string().email("emailInvalid").required("emailRequired"),
  password: yup.string().min(6, "passwordMin").required("passwordRequired"),
});

type CreateUserFormData = yup.InferType<typeof createUserSchema>;

const CreateUserForm = () => {
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("newUser");
  const isRtl = locale === "ar";

  const form = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: CreateUserFormData) => {
    setIsSubmitting(true);
    await signUp.email(
      {
        name: values.name,
        password: values.password,
        email: values.email,
      },
      {
        onRequest: () => {
          setFormError("");
          toast.loading(t("messages.loading"));
        },
        onSuccess: () => {
          toast.success(t("messages.success"));
          router.push("/admin/users");
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
          toast.error(ctx.error.message);
        },
      }
    );
    setIsSubmitting(false);
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-12 "
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-xl shadow-md border rounded-xl border-gray-200">
        <CardHeader className="text-center space-y-2">
          <img
            src="/Boed Logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto"
          />
          <CardTitle className="text-2xl font-semibold">{t("title")}</CardTitle>
          <CardDescription className="text-gray-500">
            {t("description")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <FormFieldset className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{t("form.name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.namePlaceholder")}
                          {...field}
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage>
                        {fieldState.error &&
                          t(`form.validation.${fieldState.error.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{t("form.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("form.emailPlaceholder")}
                          {...field}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage>
                        {fieldState.error &&
                          t(`form.validation.${fieldState.error.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{t("form.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("form.passwordPlaceholder")}
                          {...field}
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage>
                        {fieldState.error &&
                          t(`form.validation.${fieldState.error.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </FormFieldset>

              {/* Server Error */}
              {formError && (
                <FormError
                  className="mt-4 text-sm text-red-600"
                  message={formError}
                />
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="mt-6 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-sm text-center text-muted-foreground">
          <p className="w-full">
            {t("messages.backLink")}{" "}
            <Link href="/admin/users" className="text-blue-600 hover:underline">
              {t("messages.backText")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateUserForm;
