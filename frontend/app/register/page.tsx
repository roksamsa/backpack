import RegisterForm from "@/src/components/authenticate/register-form";
import { Card, CardBody } from "@nextui-org/react";

const RegisterPage = () => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <Card
          className="border-none bg-background/100 max-w-[610px] w-[400px]"
          shadow="lg"
        >
          <CardBody className="p-5">
            <h1 className="mb-5">Register</h1>
            <RegisterForm></RegisterForm>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
