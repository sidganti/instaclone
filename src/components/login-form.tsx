"use client";

import { login } from "@/lib/actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/schema";

import { useState } from "react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./ui/password-input";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: ""
      }
  });
  const { setError, formState: { errors }} = form;

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    const error = await login(data);

    if (error) {
      setError("root.serverError", {
        type: error.status?.toString(),
        message: error.message
      });

      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-2">
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
          {errors && errors.root &&
            <p className="font-medium text-destructive text-xs">{errors.root.serverError.message}</p>
          }
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            disabled={loading}
          >
            Login
            { loading &&
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            }
          </Button>
          <span className="text-sm">
            Dont have an account?
            <Button variant={"link"}>
              <Link href="/signup">Sign up</Link>
            </Button>
          </span>
        </CardFooter>
      </form>
    </Form>
  );
}
