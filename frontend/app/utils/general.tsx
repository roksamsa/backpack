export function getBackendURL(): string {
  return process.env?.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
}
