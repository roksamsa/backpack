"use client";

import React from "react";
import { useFormState } from "react-dom";
import { StrapiToast } from "../strapi-toast";
import { Input } from "@nextui-org/input";
import { registerUserAction } from "@/app/actions/auth-actions";
import { Button } from "@nextui-org/button";

const RegisterForm = () => {
  const INITIAL_STATE = {
    data: null,
  };
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordTwo, setPasswordTwo] = React.useState("");
  const [error, setError] = React.useState(null);
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );

  return (
    <div className="wrapper">
      <form action={formAction} className="form">
        <label htmlFor="username">
          <p>Username</p>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
        </label>
        <label htmlFor="email">
          <p className="mt-4">Email</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          <p className="mt-4">Password</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="passwordTwo">
          <p className="mt-4">Confirm Password</p>
          <Input
            onChange={(e) => setPasswordTwo(e.target.value)}
            required
            value={passwordTwo}
            type="password"
            name="passwordTwo"
            id="passwordTwo"
            placeholder="Confirm Password"
          />
        </label>
        <Button type="submit" color="primary" className="mt-5">
          Register
        </Button>
      </form>
      <StrapiToast
        toastMessage={formState?.message}
        isOpen={!!formState?.message}
      />
    </div>
  );
};

export default RegisterForm;
