import { Session } from "next-auth";

export interface Credentials {
  email: string;
  password: string;
}

export interface CustomToken {
  id: number;
}
