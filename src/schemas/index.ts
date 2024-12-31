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

const phoneRegex = new RegExp(/^(\+?[1-9][0-9]{1,14}|[0-9]{10,15})$/);

const CheckOutSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Invalid phone number!")
    .min(6, "Phone number must be at least 6 characters.")
    .max(11, "Phone number cannot be larger than 11 characters"),
  country: z.string().optional(),
  address: z.string().min(4, "Please fill in address"),
  city: z.string().min(1, "Please fill city"),
});

export { SubscribeSchema, LoginSchema, RegisterSchema, CheckOutSchema };
