"use client";

import { signup } from "@/lib/actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "@/lib/schema";

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
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: ""
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
        <CardContent className="flex flex-col gap-2">
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
                  <Input
                    placeholder="Password"
                    type="password"
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
            Signup
            { loading &&
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            }
          </Button>
          <span className="text-sm">
            Already have an account?
            <Button variant={"link"}>
              <Link href="/login">Login</Link>
            </Button>
          </span>
        </CardFooter>
      </form>
    </Form>
  );
}
