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
    role: z.enum(["ceo", "admin", "user"]).optional(),
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
  categoryRoomId: z.string().min(1, "Cannot be left blank"),
  viewId: z.string().min(1, "Cannot be left blank"),
  typeBedId: z.string().min(1, "Cannot be left blank"),
  sleeps: z.number().min(1, "Sleeps greater than or equal to 1"),
  images: z.any().optional(),
  map: z.any().optional(),
  shortDes: z.string().min(2, "ShortDes must be greater than 2 characters"),
  detailDes: z.string().min(2, "DetailDes must be greater than 2 characters"),
});

const RoomSchema = z.object({
  roomNumber: z.number().min(1, "Minimum number of rooms 1 characters"),
  roomTypeId: z.string().min(1, "Cannot be left blank"),
  floor: z.number().min(1, "Minimum number of floor 1 characters"),
  status: z.string().optional(),
});

const ViewSchema = z.object({
  title: z.string().min(1, "Minimum number of views 1 characters"),
});

const TypeBedSchema = z.object({
  title: z.string().min(1, "Minimum number of typeBed 1 characters"),
});

const CategoryRoomSchema = z.object({
  title: z.string().min(1, "Minimum number of categoryRoom 1 characters"),
});

const FoodSchema = z.object({
  title: z.string().min(1, "Minimum number of food 1 characters"),
});

const OptionSchema = z.object({
  title: z.string().min(1, "Minimum number of option 1 characters"),
  foodId: z.string().min(1, "Cannot be left blank"),
  price: z.number().min(1, "Price greater than or equal to 1"),
  extensions: z.string().array().optional(),
  typeDescription: z
    .string()
    .min(1, "Minimum number of categoryRoom 1 type description"),
});

const ReviewSchema = z.object({
  title: z.string().min(1, "Minimum number of review 1 characters"),
  userId: z.string().min(1, "Cannot be left blank"),
  roomTypeId: z.string().min(1, "Cannot be left blank"),
  description: z
    .string()
    .min(1, "Minimum number of categoryRoom 1 description"),
});

const PaymentSchema = z.object({
  title: z.string().min(1, "Minimum number of review 1 characters"),
  userId: z.string().min(1, "Cannot be left blank"),
  cartId: z.string().min(1, "Cannot be left blank"),
  paymentMethod: z
    .string()
    .min(1, "Minimum number of payment method 1 characters"),
});

const CartSchema = z.object({
  optionId: z.string().min(1, "Cannot be left blank"),
  userId: z.string().min(1, "Cannot be left blank"),
  roomId: z.string().min(1, "Cannot be left blank"),
  roomTypeId: z.string().min(1, "Cannot be left blank"),
  status: z.string().optional(),
  price: z.number().min(1, "Price must be greater than or equal to 1"),
  totalPrice: z
    .number()
    .min(1, "Total price must be greater than or equal to 1"),
  dayNumber: z.string().min(1, "Minimum number of dayNumber is 1 character"),
  bookedDates: z.object({
    from: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    to: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  }),
  paymentMethod: z
    .string()
    .min(1, "Minimum number of payment method is 1 character"),
});

export {
  SubscribeSchema,
  LoginSchema,
  RegisterSchema,
  CheckOutSchema,
  UserSchema,
  RoomTypesSchema,
  RoomSchema,
  ViewSchema,
  TypeBedSchema,
  CategoryRoomSchema,
  FoodSchema,
  OptionSchema,
  ReviewSchema,
  PaymentSchema,
  CartSchema,
};
