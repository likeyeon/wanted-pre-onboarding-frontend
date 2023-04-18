import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Header = ({ authType, handleLogout }) => {
  let title = "";

  switch (authType) {
    case "signin":
      title = "로그인";
      break;
    case "signup":
      title = "회원가입";
      break;
    case "todo":
      title = "TODO-LIST 🔥";
      break;
    default:
      title = "No title";
      break;
  }

  return (
    <div className="flex justify-between w-96 bg-blue-600 text-white p-2 font-bold rounded-t-lg">
      {title}
      {authType === "todo" ? (
        <button onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      ) : null}
    </div>
  );
};

export { Header };
