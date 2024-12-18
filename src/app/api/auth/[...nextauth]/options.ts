import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
import { CustomSession, CustomUser } from "@/utils/interfaces";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import TodoistProvider from "next-auth/providers/todoist";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"], // adjust logging levels
});

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
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter your email and password");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (user.hashedPassword) {
            const isValidPassword = await compare(
              credentials.password,
              user.hashedPassword,
            );
            if (!isValidPassword) {
              throw new Error("Invalid password");
            }
          }

          // Return a valid user object
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            image: user.image,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw error;
        }
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
    async signIn({ user, account, profile }) {
      if (!user || !user.email) {
        console.error("User or email not provided");
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const currentDate = new Date();
          await prisma.user.create({
            data: {
              email: user.email,
              emailVerified: profile?.email_verified ? currentDate : null,
              name: profile?.given_name || user.name || "",
              lastname: profile?.family_name || "",
              image: user.image,
              socialId: account?.providerAccountId,
            },
          });
        }
      } catch (error) {
        console.error("Error checking or creating user:", error);
        return false;
      }
      return true;
    },
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
