"use client";

import { signup } from "@/lib/actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "@/lib/schema";

import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./ui/password-input";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const { setError, formState: { errors }} = form;

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    setLoading(true);
    const error = await signup(data);

    if (error) {
      if (error.status === 400) {
        setError("email", {
          type: error.status?.toString(),
          message: "Email is already associated with another account"
        });
      }
      else if (error.status === 500) {
        setError("username", {
          type: error.status?.toString(),
          message: "Username is already taken"
        });
      }
      else {
        setError("root.serverError", {
          type: error.status?.toString(),
          message: error.message
        });
      }
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <br />
          {errors && errors.root &&
            <p className="font-medium text-destructive text-xs">{errors.root.serverError.message}</p>
          }
          <Button
            className="w-full"
            disabled={loading}
          >
            Sign up
            { loading &&
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}
