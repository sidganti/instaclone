import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is empty").max(64, "Password cannot be more than 64 characters")
});

export const signupFormSchema = z.object({
  fullname: z.string().min(1, "Fullname is empty").max(32, "Fullname cannot be more than 32 characters"),
  username: z.string().min(1, "Username is empty").max(32, "Username cannot be more than 32 characters"),
  email: z.string().email(),
  password: z.string().min(1, "Password is empty").max(64, "Password cannot be more than 64 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match"
});
