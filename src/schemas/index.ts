import { z } from "zod";

const SubscribeSchema = z.object({
  username: z.string().trim().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be greater than or equal to 6 characters"),
});

const RegisterSchema = z
  .object({
    username: z.string().trim().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["ceo", "admin", "user"]),
    password: z
      .string()
      .min(6, "Password must be greater than or equal to 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export { SubscribeSchema, LoginSchema, RegisterSchema };
