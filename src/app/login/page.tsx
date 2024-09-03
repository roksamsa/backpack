"use client";

import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.currentTarget.email.value;
          const password = e.currentTarget.password.value;
          signIn("credentials", { redirect: false, email, password });
        }}
      >
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
