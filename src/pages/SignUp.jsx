// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function SignUp() {
//   const navigate = useNavigate();
//   /* 이메일, 비밀번호 입력 값 */
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   /* 이메일, 비밀번호 유효성  */
//   const [isValid, setIsValid] = useState({
//     isEmail: false,
//     isPassword: false,
//   });
//   /* 이메일, 비밀번호 오류메세지 */
//   const [message, setMessage] = useState({
//     emailMessage: "",
//     passwordMessage: "",
//   });

//   /* 이메일 유효성 검사 */
//   const handleEmail = (e) => {
//     console.log("ID");
//     setEmail(e.target.value);
//     const expEmail = /@+/.test(e.target.value);
//     if (!expEmail) {
//       // setEmailMessage("이메일에는 @를 포함해주세요");
//       setMessage({ ...message, emailMessage: "이메일에는 @를 포함해주세요" });
//       setIsValid({ ...isValid, isEmail: false });
//     } else {
//       // setEmailMessage("");
//       setMessage({ ...message, emailMessage: "" });
//       setIsValid({ ...isValid, isEmail: true });
//     }
//   };
//   /* 비밀번호 유효성 검사 */
//   const handlePassword = (e) => {
//     console.log("password");
//     setPassword(e.target.value);
//     const expPassword = e.target.value.length;
//     if (expPassword < 8) {
//       setMessage({
//         ...message,
//         passwordMessage: "비밀번호는 8자 이상 입력해주세요",
//       });
//       setIsValid({ ...isValid, isPassword: false });
//     } else {
//       setMessage({ ...message, passwordMessage: "" });
//       setIsValid({ ...isValid, isPassword: true });
//     }
//   };
//   const onSubmit = (e) => {
//     console.log("submit");
//     e.preventDefault();
//     axios({
//       method: "post",
//       url: "https://www.pre-onboarding-selection-task.shop/auth/signup",
//       data: { email: email, password: password },
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => {
//         navigate("/signin");
//       })
//       .catch((err) => {
//         alert("이미 사용 중인 이메일입니다.");
//       });
//   };

//   return (
//     <div>
//       <form>
//         <label htmlFor="email">이메일 : </label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           data-testid="email-input"
//           onChange={handleEmail}
//           value={email}
//         ></input>
//         <p>{message.emailMessage}</p>
//         <label htmlFor="password">비밀번호 : </label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           data-testid="password-input"
//           onChange={handlePassword}
//           value={password}
//         ></input>
//         <p>{message.passwordMessage}</p>
//         <button
//           type="submit"
//           data-testid="signup-button"
//           onClick={onSubmit}
//           disabled={!(isValid.isEmail && isValid.isPassword)}
//         >
//           회원가입
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;
import { AuthForm } from "../components/auth/AuthForm";

const SignUp = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <AuthForm authType={"signup"} />
    </div>
  );
};

export { SignUp };
