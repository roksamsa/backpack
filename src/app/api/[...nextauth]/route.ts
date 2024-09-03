import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import {
  Credentials,
  CustomSession,
  CustomToken,
} from "@/interfaces/interfaces";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await compare(credentials.password, user.hashedPassword))
        ) {
          return { id: user.id }; // Return a simplified user object
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }) {
      if (token.id) {
        session.userId = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: CustomToken; user?: { id: number } }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
