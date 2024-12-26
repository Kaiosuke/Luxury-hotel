import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instanceLocal from "./app/api/instances";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await instanceLocal.get("users", {
            params: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });
          console.log(res.data);
          const user = res.data[0];
          if (res.status === 200 && user) {
            return user;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
});
