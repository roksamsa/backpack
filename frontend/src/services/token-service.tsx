import { cookies } from "next/headers";

export function getAuthToken() {
  const authToken = cookies().get("jwt")?.value;

  return authToken;
}
