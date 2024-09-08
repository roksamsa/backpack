import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateQueryString = (name: string, value: string) => {
  const searchParams = useSearchParams();

  // Convert current search params to a mutable URLSearchParams object
  const params = new URLSearchParams(searchParams.toString());

  // Set the given name and value
  params.set(name, value);

  // Return the updated query string
  return params.toString();
};
