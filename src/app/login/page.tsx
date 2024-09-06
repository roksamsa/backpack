"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("status", session);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push("/app");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to the homepage or dashboard after successful login
      router.push("/app");
    }
  };

  return (
    <div className="page__content">
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" color="primary">
              Login
            </Button>
            <Button onClick={() => signIn("github")}>
              Sign in with GitHub
            </Button>
            <Button onClick={() => signIn("google")}>
              Sign in with Google
            </Button>
            <Button onClick={() => signIn("twitter")}>
              Sign in with Twitter
            </Button>
            <Button onClick={() => signIn("linkedin")}>
              Sign in with Linkedin
            </Button>
            <Button onClick={() => signIn("todoist")}>
              Sign in with Todoist
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
