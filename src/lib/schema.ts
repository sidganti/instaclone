import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is empty').max(64, 'Password cannot be more than 64 characters')
});

export const signupFormSchema = z.object({
  fullname: z.string().min(1).max(32),
  username: z.string().min(1).max(32),
  email: z.string().email(),
  password: z.string().min(1, 'Password is empty').max(64, 'Password cannot be more than 64 characters')
});
