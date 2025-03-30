"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
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
                        <Button onPress={() => signIn("github")}>
                            Sign in with GitHub
                        </Button>
                        <Button onPress={() => signIn("google")}>
                            Sign in with Google
                        </Button>
                        <Button onPress={() => signIn("twitter")}>
                            Sign in with Twitter
                        </Button>
                        <Button onPress={() => signIn("linkedin")}>
                            Sign in with Linkedin
                        </Button>
                        <Button onPress={() => signIn("todoist")}>
                            Sign in with Todoist
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
