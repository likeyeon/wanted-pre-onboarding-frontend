import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "../components/todo/TodoItem";
import axios from "axios";

const TodoList = () => {
  const [todoInput, setTodoInput] = useState(""); // 투두리스트 텍스트 입력
  const [todos, setTodos] = useState([]); // 투두리스트 목록들

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else getTodo();
  }, [token]);

  /* 투두리스트 입력창 */
  const inputTodo = (e) => {
    setTodoInput(e.target.value);
  };

  /* 투두리스트 얻기 함수 */
  const getTodo = async () => {
    try {
      const response = await axios.get(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* 투두리스트 추가 함수 */
  const addTodo = async (e) => {
    e.preventDefault();
    if (todoInput === "") {
      alert("할 일을 입력해주세요.");
      return;
    }
    try {
      const res = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: todoInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      await getTodo(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setTodoInput("");
  };

  /* 로그아웃 */
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("access_token");
      navigate("/signin");
    }
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <button onClick={handleLogout}>로그아웃</button>
        <form onSubmit={addTodo}>
          <input
            data-testid="new-todo-input"
            value={todoInput}
            onChange={inputTodo}
            placeholder="할 일을 입력해주세요."
          />
          <button data-testid="new-todo-add-button" type={"submit"}>
            추가
          </button>
        </form>
      </div>
      <div>
        {todos &&
          todos.map((item) => (
            <TodoItem
              text={item.todo}
              id={item.id}
              key={item.id}
              userId={item.userId}
              item={item}
              todos={todos}
              isCompleted={item.isCompleted}
              setTodos={setTodos}
            />
          ))}
      </div>
    </>
  );
};

export { TodoList };
