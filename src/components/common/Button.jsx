const Button = ({ authType, onClick, disabled = false }) => {
  return (
    <button
      type="submit"
      data-testid={authType === "signup" ? "signup-button" : "signin-button"}
      onClick={onClick}
      disabled={disabled}
    >
      {authType === "signup" ? "회원가입" : "로그인"}
    </button>
  );
};

export { Button };
