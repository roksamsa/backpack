import { registerWithEmailAndPassword } from "@/firebase/utils";
import { Input } from "@nextui-org/react";
import React from "react";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordTwo, setPasswordTwo] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleForm = async (event: any) => {
    event.preventDefault();

    const user = await registerWithEmailAndPassword(email, password);

    if (!user) {
      return console.log(user);
    }

    console.log(user);
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <label htmlFor="passwordTwo">
            <p>Confirm Password</p>
            <Input
              onChange={(e) => setPasswordTwo(e.target.value)}
              required
              value={passwordTwo}
              type="passwordTwo"
              name="passwordTwo"
              id="passwordTwo"
              placeholder="Confirm Password"
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
