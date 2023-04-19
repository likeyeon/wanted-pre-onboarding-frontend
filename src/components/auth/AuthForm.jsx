import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../common/Button";
import axios from "axios";

/* 회원가입, 로그인 폼 컴포넌트 */
const AuthForm = ({ authType }) => {
  const navigate = useNavigate();
  /* 이메일, 비밀번호 입력 값 */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* 이메일, 비밀번호 유효성  */
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
  });
  /* 이메일, 비밀번호 오류메세지 */
  const [message, setMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
  });

  /* 이메일 유효성 검사 */
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const expEmail = /@+/.test(e.target.value);
    if (!expEmail) {
      setMessage({ ...message, emailMessage: "이메일에는 @를 포함해주세요" });
      setIsValid({ ...isValid, isEmail: false });
    } else {
      setMessage({ ...message, emailMessage: "" });
      setIsValid({ ...isValid, isEmail: true });
    }
  };

  /* 비밀번호 유효성 검사 */
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const expPassword = e.target.value.length;
    if (expPassword < 8) {
      setMessage({
        ...message,
        passwordMessage: "비밀번호는 8자 이상 입력해주세요",
      });
      setIsValid({ ...isValid, isPassword: false });
    } else {
      setMessage({ ...message, passwordMessage: "" });
      setIsValid({ ...isValid, isPassword: true });
    }
  };

  /* 회원가입, 로그인 */
  const onSubmit = (e) => {
    e.preventDefault();
    if (authType === "signup") {
      axios({
        method: "post",
        url: "https://www.pre-onboarding-selection-task.shop/auth/signup",
        data: { email: email, password: password },
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          navigate("/signin");
        })
        .catch((err) => {
          alert("이미 사용 중인 이메일입니다.");
        });
    } else {
      axios({
        method: "post",
        url: "https://www.pre-onboarding-selection-task.shop/auth/signin",
        data: { email: email, password: password },
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        })
        .catch((err) => {
          if (err.response.status === 401)
            alert("이메일과 비밀번호가 일치하지 않습니다.");
          else if (err.response.status === 404)
            alert("존재하지 않는 이메일입니다.");
          else alert("에러 발생");
        });
    }
  };

  return (
    <div>
      <form className="w-96 p-8 bg-white drop-shadow-xl rounded-xl">
        <div>
          <label htmlFor="email" className="mb-1 font-semibold text-base block">
            이메일
          </label>
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={handleEmail}
            placeholder="이메일을 입력해주세요."
            value={email}
            className="border p-3 border-gray-300 focus:border-blue-600 w-full rounded placeholder:text-sm"
          ></input>
          <p className="text-sm mt-1 text-red-500">{message.emailMessage}</p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="mt-4 mb-1 font-semibold text-base block"
          >
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            onChange={handlePassword}
            placeholder="비밀번호를 입력해주세요."
            value={password}
            autoComplete="off"
            className="border p-3 border-gray-300 focus:border-blue-600 w-full rounded placeholder:text-sm"
          ></input>
          <p className="text-sm mt-1 text-red-500">{message.passwordMessage}</p>
        </div>
        <Button
          authType={authType}
          onClick={onSubmit}
          disabled={!(isValid.isEmail && isValid.isPassword)}
        />
      </form>
      <div className="flex justify-center mt-5">
        {authType === "signin" ? (
          <>
            <span className="text-sm text-gray-400">
              계정이 없으신가요?&nbsp; &nbsp;
            </span>
            <span className="text-sm text-blue-600">
              <Link to="/signup">가입하기</Link>
            </span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export { AuthForm };
