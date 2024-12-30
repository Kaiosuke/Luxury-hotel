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

const CheckOutSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  phoneNumber: z.number().min(8, "Phone number minimum 8 characters"),
  country: z.string().min(1, "Please select country"),
  address: z.string().min(4, "Please fill in address"),
  city: z.string().min(1, "Please fill city"),
  reservation: z.string().optional(),
});

export { SubscribeSchema, LoginSchema, RegisterSchema, CheckOutSchema };
