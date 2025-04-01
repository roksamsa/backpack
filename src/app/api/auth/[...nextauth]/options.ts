import type { ISODateString, NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import TodoistProvider from "next-auth/providers/todoist";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'], // adjust logging levels
});

export interface CustomSession {
    user?: {
        id?: any | null;
        name?: string | null;
        lastname?: any | null;
        email?: string | null;
        image?: string | null;
        schemaStructure?: string | null;
    };
    expires: ISODateString;
}

interface CustomUser {
    id: string;
    name?: string | null;
    lastname?: string | null;
    email?: string | null;
    schemaStructure?: string | null;
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
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
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
                email: { label: "Email", type: "text", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter your email and password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("User not found");
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
        async jwt({ token, user }: { token: JWT; user: CustomUser; }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email || "" },
                });

                if (dbUser) {
                    token.id = dbUser.id;
                    token.lastname = dbUser.lastname;
                } else {
                    token.id = user.id;
                    token.lastname = user.lastname;
                    token.schemaStructure = user.schemaStructure;
                }
            }

            return token;
        },
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email || "" },
                    });

                    console.log("44444444444", user);

                    if (!existingUser) {
                        // Create user if not found
                        if (account) {
                            const providerIdField = `${account.provider}Id` as keyof CustomUser;

                            // Create user
                            const newUser = await prisma.user.create({
                                data: {
                                    email: user.email || "",
                                    name: user.name || "New User",
                                    lastname: "",
                                    image: user.image,
                                    ...(providerIdField ? { [providerIdField]: user.id } : {}),
                                },
                            });

                            // Create schemaStructure for the new user
                            await prisma.schemaStructure.create({
                                data: {
                                    userId: newUser.id, // Use the newly created user's ID
                                    schema: [],
                                },
                            });
                        }
                    } else {
                        // Update user if already exists
                        if (account) {
                            const providerIdField = `${account.provider}Id` as keyof CustomUser;

                            await prisma.user.update({
                                where: { email: user.email! },
                                data: {
                                    email: user.email!,
                                    name: user.name || "Updated User",
                                    image: user.image || null,
                                    ...(providerIdField ? { [providerIdField]: user.id } : {}),
                                },
                            });
                        }

                        // Ensure schemaStructure exists for the user
                        const existingSchema = await prisma.schemaStructure.findUnique({
                            where: { userId: existingUser.id },
                        });

                        if (!existingSchema) {
                            // Create schemaStructure for the existing user
                            await prisma.schemaStructure.create({
                                data: {
                                    userId: existingUser.id, // Use the existing user's ID
                                    schema: [],
                                },
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error creating or updating user:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }: { session: CustomSession; token: JWT; }) {
            if (token?.id && session.user) {
                session.user.id = token.id;
                session.user.lastname = token.lastname;
            }

            return session;
        },
    },
};
