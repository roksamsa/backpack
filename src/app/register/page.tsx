"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Register = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      console.log("User registered successfully");
    } else {
      console.log("Failed to register user");
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/register");
    } else {
      router.push("/app");
    }
  }, [status, router]);

  return (
    <div className="page__content">
      <Card>
        <CardBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" label="Name" placeholder="Enter your name" />
            <Input
              type="text"
              label="Last name"
              placeholder="Enter your last name"
            />
            <Input type="email" label="Email" placeholder="Enter your email" />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Input
              type="password"
              label="Repeat password"
              placeholder="Retype your password again"
            />
            <Button type="submit" color="primary">
              Register
            </Button>

            <Button type="submit" color="primary">
              Register with GitHub
            </Button>

            <Button type="submit" color="primary">
              Register with Discord
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
