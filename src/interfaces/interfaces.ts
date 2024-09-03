import { Session } from "next-auth";

export interface Credentials {
  email: string;
  password: string;
}

export interface CustomSession extends Session {
  userId?: number; // Add any custom properties you need
}

export interface CustomToken {
  id: number;
}
