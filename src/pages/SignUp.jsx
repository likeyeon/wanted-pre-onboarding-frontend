import { AuthForm } from "../components/auth/AuthForm";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* 회원가입 페이지 */
const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <Container>
      <Header authType={"signup"} />
      <AuthForm
        authType={"signup"}
        className="flex items-center justify-center"
      />
    </Container>
  );
};

export { SignUp };
