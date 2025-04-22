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
import { signUpSchema } from "@/validators/authValidators";
import { signUp } from "@/lib/auth-client";

// Validation Schema
const createUserSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

type CreateUserFormData = yup.InferType<typeof createUserSchema>;

const CreateUserForm = () => {
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
          toast.loading("Creating account...");
        },
        onSuccess: () => {
          toast.success("Account Creation Successful");
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
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gray-100">
      <Card className="w-full max-w-xl shadow-md border rounded-xl border-gray-200">
        <CardHeader className="text-center space-y-2">
          <img
            src="/Boed Logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto"
          />
          <CardTitle className="text-2xl font-semibold">
            Create New User
          </CardTitle>
          <CardDescription className="text-gray-500">
            Fill out the form below to add a new user to the system.
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter full name"
                          {...field}
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="user@example.com"
                          {...field}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
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
                {isSubmitting ? "Creating..." : "Create User"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-sm text-center text-muted-foreground">
          <p className="w-full">
            Want to manage users?{" "}
            <a href="/admin/users" className="text-blue-600 hover:underline">
              Back to user list
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateUserForm;
