"use client";

import { fetchData } from "@/utils/apiHelper";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const schemaStructureId = uuidv4();
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, lastname, schemaStructure: schemaStructureId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            await fetchData({
                url: "/api/schemaStructure/create",
                method: "POST",
                body: {
                    schema: [],
                    userId: data.user.id,
                },
            });

            // Registration successful, redirect to login or home page
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
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
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
                        <Input
                            type="text"
                            label="Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="text"
                            label="Last name"
                            placeholder="Enter your last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
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
