"use client";

import React from "react";
import { useFormState } from "react-dom";
import { StrapiToast } from "../strapi-toast";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { registerUserAction } from "@/src/actions/auth-actions";

const RegisterForm = () => {
  const INITIAL_STATE = {
    data: null,
  };
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
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="passwordTwo">
          <p className="mt-4">Confirm Password</p>
          <Input
            required
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
