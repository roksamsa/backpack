"use client";

import LoginForm from "@/components/authenticate/login-form";
import "@/styles/style.scss";

const LoginPage = () => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <h1>Login</h1>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
