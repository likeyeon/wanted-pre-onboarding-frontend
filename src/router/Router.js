import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { Todo } from "../pages/Todo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
