"use client"

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
  const [serverError, setServerError] = useState<any>();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    setLoading(true);
    try {
      await signup(data);
    } catch (error) {
      setServerError(error);
    }
  }

  if (serverError) {
    throw serverError;
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
  )
}
