"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [status, router]);

  // Show loading spinner or placeholder while checking authentication status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Only render children if authenticated
  return session ? <>{children}</> : null;
}
