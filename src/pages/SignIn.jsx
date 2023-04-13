import { AuthForm } from "../components/auth/AuthForm";

const SignIn = () => {
  return (
    <div>
      <h1>로그인</h1>
      <AuthForm authType={"signin"} />
    </div>
  );
};

export { SignIn };
