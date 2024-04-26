'use client';

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { StrapiToast } from "../strapi-toast";
import { loginUserAction } from "@/src/actions/auth-actions";

const LoginForm = () => {
  const INITIAL_STATE = {
    data: null,
  };
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  return (
    <div className="wrapper">
      <form action={formAction} className="form">
        <label htmlFor="email">
          <Input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          <Input
            required
            type="password"
            name="password"
            id="password"
            className="mt-3"
            placeholder="Password"
          />
        </label>
        <div className="mt-5">
          <Button type="submit" color="primary" className="me-3">
            Login
          </Button>
        </div>
      </form>
      <StrapiToast
        toastMessage={formState?.message}
        isOpen={!!formState?.message}
      />
    </div>
  );
};

export default LoginForm;
