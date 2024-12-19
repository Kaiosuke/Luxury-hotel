import { z } from "zod";

const subscribeForm = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export { subscribeForm };
