import type { ISODateString, NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import TodoistProvider from "next-auth/providers/todoist";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export interface CustomSession {
  user?: {
    id?: any | null;
    name?: string | null;
    lastname?: any | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}
interface CustomUser {
  id: string;
  name?: string | null;
  lastname?: string | null;
  email?: string | null;
}

export const options: NextAuthOptions = {
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
    TodoistProvider({
      clientId: process.env.TODOIST_ID!,
      clientSecret: process.env.TODOIST_SECRET!,
      version: "2.0",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        // Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Verify password
        if (user.hashedPassword) {
          const isValidPassword = await compare(
            credentials.password,
            user.hashedPassword,
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
        }

        // If authentication succeeds, return the user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          image: user.image,
        };
      },
    }),
  ],
  events: {
    async signIn(message) {
      console.log("Signed in!", { message });
    },
    async signOut(message) {
      console.log("Signed out!", { message });
    },
    async createUser(message) {
      console.log("User created!", { message });
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.lastname = user.lastname;
      }

      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (token?.id && session.user) {
        session.user.id = token.id;
        session.user.lastname = token.lastname;
      }

      return session;
    },
  },
};
