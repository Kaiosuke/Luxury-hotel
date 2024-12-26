import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instanceLocal from "./app/api/instances";
import { IUser } from "./interfaces";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

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
          const user: IUser = res.data[0];
          console.log(user);
          if (user) {
            return { id: user.id, username: user.username };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          // userId: user.id,
          // role: user.role,
        },
      };
    },
  },
});
