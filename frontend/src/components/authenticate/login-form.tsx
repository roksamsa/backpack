import React from "react";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/utils";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogIn = async (event: any, isGoogleAccountLoggingIn: boolean) => {
    event.preventDefault();

    try {
      let user: any;

      if (isGoogleAccountLoggingIn) {
        user = await signInWithGoogle();
      } else {
        user = await loginWithEmailAndPassword(email, password);
      }

      console.log("user", user);

      if (!user) {
        return console.log(user);
      }

      return router.push("/app/dashboard");
    } catch (error) {
      console.error("Error signing in!", error);
    }
  };
  return (
    <form onSubmit={(event) => handleLogIn(event, false)} className="form">
      <label htmlFor="email">
        <p>Email</p>
        <input
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
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </label>
      <button type="submit">Sign up</button>
      <button onClick={(event) => handleLogIn(event, true)}>
        Sign in with Google
      </button>
    </form>
  );
};

export default LoginForm;
