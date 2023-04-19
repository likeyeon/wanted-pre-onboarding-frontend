/* 로그인, 회원가입 공통 버튼 */
const button = "font-bold w-full py-3 mt-7 text-lg rounded-md";

const Button = ({ authType, onClick, disabled = false }) => {
  return (
    <button
      type="submit"
      data-testid={authType === "signup" ? "signup-button" : "signin-button"}
      onClick={onClick}
      disabled={disabled}
      className={
        disabled
          ? `${button} bg-gray-100 text-gray-300`
          : `${button} bg-blue-600 text-white`
      }
    >
      {authType === "signup" ? "회원가입" : "로그인"}
    </button>
  );
};

export { Button };
