import LoginForm from "@/src/components/authenticate/login-form";
import { Card, CardBody } from "@nextui-org/react";
import "../../src/styles/style.scss";

const LoginPage = () => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <Card
          className="border-none bg-background/100 max-w-[610px] w-[400px]"
          shadow="lg"
        >
          <CardBody className="p-5">
            <h1 className="mb-5">Login</h1>
            <LoginForm></LoginForm>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
