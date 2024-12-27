import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instanceLocal from "./app/api/instances";
import { IUser } from "./interfaces";
import { InvalidEmailPasswordError } from "./utils/nextAuth/errors";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "ceo" | "admin" | "user";
    };
    token: JWT;
    accessToken?: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
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
        const res = await instanceLocal.get("users", {
          params: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        const user: IUser = res.data[0];
        if (!user) {
          throw new InvalidEmailPasswordError();
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as unknown) = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
