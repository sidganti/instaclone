"use client";

import { login } from "@/lib/actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/schema";

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
      if (error.status === 400) {
        setError("root.serverError", {
          type: error.status?.toString(),
          message: "Incorrect email or password"
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
          <br />
          {errors && errors.root &&
            <p className="font-medium text-destructive text-xs">{errors.root.serverError.message}</p>
          }
          <Button
            className="w-full"
            disabled={loading}
          >
            Login
            { loading &&
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}
