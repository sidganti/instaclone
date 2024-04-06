"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { z } from "zod";
import { loginFormSchema, signupFormSchema } from "./schema";

/* AUTH ACTIONS */

export async function login(formData: z.infer<typeof loginFormSchema>) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      name: error.name,
      status: error.status,
      message: error.message
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: z.infer<typeof signupFormSchema>) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
        email: formData.email,
        fullname: formData.fullname
      }
    }
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      name: error.name,
      status: error.status,
      message: error.message
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      name: error.name,
      status: error.status,
      message: error.message
    }
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}
