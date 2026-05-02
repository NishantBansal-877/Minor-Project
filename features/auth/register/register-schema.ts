import { GENDER, ROLE } from "@/lib/constants-types";
import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),

    number: z
      .string("Enter the phone number")
      .min(10, "Phone number required")
      .regex(/^\+[1-9]\d{7,14}$/, "Invalid phone number"),

    email: z.string("Email is required").email("Invalid email").trim(),

    gender: z.enum(GENDER, {
      error: () => ({ message: "Select gender" }),
    }),

    role: z.enum(ROLE, {
      error: () => ({ message: "Select a role" }),
    }),

    password: z.string().min(8, "Minimum 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
