import { AuthForm } from "../components/auth/AuthForm";
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
    <div>
      {/* {authenticated ? <Navigate to="/todo"></Navigate> : <h1>로그인</h1>} */}
      <AuthForm authType={"signin"} />
    </div>
  );
};

export { SignIn };
