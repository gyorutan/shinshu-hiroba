import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
