import { AuthForm } from "../components/auth/AuthForm";
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
    <div>
      <AuthForm authType={"signup"} />
    </div>
  );
};

export { SignUp };
