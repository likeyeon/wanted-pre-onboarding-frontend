import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import axios from "axios";

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
          localStorage.setItem("access-token", res.data.access_token);
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
      <form>
        <label htmlFor="email">이메일 : </label>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={handleEmail}
          value={email}
        ></input>
        <p>{message.emailMessage}</p>
        <label htmlFor="password">비밀번호 : </label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={handlePassword}
          value={password}
        ></input>
        <p>{message.passwordMessage}</p>
        <Button
          authType={authType}
          onClick={onSubmit}
          disabled={!(isValid.isEmail && isValid.isPassword)}
        />
      </form>
    </div>
  );
};

export { AuthForm };
