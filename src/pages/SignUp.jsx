import { AuthForm } from "../components/auth/AuthForm";
import { Header } from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header authType={"signup"} />
      <AuthForm
        authType={"signup"}
        className="flex items-center justify-center"
      />
    </div>
  );
};

export { SignUp };
