"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("status", session);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push("/app");
    }
  }, [status, router]);

  return (
    <div className="page__content">
      <Card>
        <CardBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.currentTarget.email.value;
              const password = e.currentTarget.password.value;
              signIn("credentials", { redirect: false, email, password });
            }}
          >
            <Input type="email" label="Email" placeholder="Enter your email" />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
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
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
