import { AuthForm } from "../components/auth/AuthForm";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <Container>
      <Header authType={"signin"} />
      <AuthForm
        authType={"signin"}
        className="flex items-center justify-center"
      />
    </Container>
  );
};

export { SignIn };
