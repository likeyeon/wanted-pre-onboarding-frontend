import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/todo/TodoItem";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";

/* todo 리스트 페이지 */
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
  const getTodo = useCallback(async () => {
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
  }, [setTodos, token]);

  /* 투두리스트 추가 함수 */
  const addTodo = useCallback(
    async (e) => {
      e.preventDefault();
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
      } catch (err) {
        alert(err);
      }
      setTodoInput("");
    },
    [getTodo, todoInput, token]
  );

  /* 로그아웃 */
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("access_token");
      navigate("/signin");
    }
  };

  /* 날짜 */
  const getDate = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}.${month}.${day} ${dayOfWeek}`;
  };

  return (
    <Container>
      <Header authType={"todo"} handleLogout={handleLogout} />
      <div className="w-96 p-8 bg-white drop-shadow-xl rounded-xl">
        <div className="flex justify-between">
          <div>
            <div className="font-bold text-2xl">{getDate()}</div>
            <div className="text-gray-400 text-sm">{todos.length} tasks</div>
          </div>
        </div>
        <div>
          <form onSubmit={addTodo} className="flex justify-between my-3">
            <input
              data-testid="new-todo-input"
              value={todoInput}
              onChange={inputTodo}
              placeholder="오늘 할 일을 적어볼까요?"
              className="border p-2 border-gray-300 focus:border-blue-600 w-5/6 rounded placeholder:text-sm"
            />
            <button
              data-testid="new-todo-add-button"
              type={"submit"}
              disabled={todoInput.length > 0 ? false : true}
              className={
                todoInput.length > 0
                  ? "bg-blue-600 p-3 rounded"
                  : "bg-gray-300 p-3 rounded"
              }
            >
              <PlusIcon className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
        <ul>
          {todos &&
            todos.map((item) => (
              <TodoItem
                id={item.id}
                key={item.id}
                userId={item.userId}
                item={item}
                todos={todos}
                isCompleted={item.isCompleted}
                setTodos={setTodos}
              />
            ))}
        </ul>
      </div>
    </Container>
  );
};

export { TodoList };
