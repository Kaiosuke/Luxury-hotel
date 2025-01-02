import { z } from "zod";

// Regex phone number
const phoneRegex = new RegExp(/^(\+?[1-9][0-9]{1,14}|[0-9]{10,15})$/);

// Subscribe
const SubscribeSchema = z.object({
  username: z.string().trim().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
});

// Auth
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

// Check out

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

// Users

const UserSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters."),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, "Password must be greater than or equal to 6 characters"),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

// Rooms

const RoomTypesSchema = z.object({
  thumbnail: z.any().optional(),
  title: z.string().min(2, "Title must be greater than 2 characters"),
  price: z.number().min(1, "Price greater than or equal to 1"),
  quantity: z.number().min(1, "Quantity greater than or equal to 1"),
  rate: z
    .number()
    .min(1, "Rate greater than or equal to 1")
    .max(5, "Maximum rate is 5"),
  description: z
    .string()
    .min(2, "Description must be greater than 2 characters"),
  square: z.string().min(2, "Square must be greater than 2 characters"),
  typeBed: z.string().min(2, "TypeBed must be greater than 2 characters"),
  sleeps: z.number().min(1, "Sleeps greater than or equal to 1"),
  // images: z.string().array().optional(),
  // map: z.string().min(1, "Cannot be left blanks"),
  shortDes: z.string().min(2, "ShortDes must be greater than 2 characters"),
  detailDes: z.string().min(2, "DetailDes must be greater than 2 characters"),
});

export {
  SubscribeSchema,
  LoginSchema,
  RegisterSchema,
  CheckOutSchema,
  UserSchema,
  RoomTypesSchema,
};
