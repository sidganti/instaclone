"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { z } from "zod";
import { loginFormSchema, signupFormSchema } from "./schema";

export async function login(formData: z.infer<typeof loginFormSchema>) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: z.infer<typeof signupFormSchema>) {
  const supabase = createClient();

  const data = {
    fullname: formData.fullname,
    username: formData.username,
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}
