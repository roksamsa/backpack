"use client";

import RegisterForm from "@/components/authenticate/register-form";
import "@/styles/style.scss";

const RegisterPage = () => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <h1>Register</h1>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
};

export default RegisterPage;
