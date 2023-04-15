import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "./TodoItem";
import axios from "axios";

const TodoList = () => {
  const [todoInput, setTodoInput] = useState(""); // 투두리스트 텍스트 입력
  const [todos, setTodos] = useState([]); // 투두리스트 목록들

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
    }
  });

  /* 투두리스트 입력창 */
  const inputTodo = (e) => {
    setTodoInput(e.target.value);
  };

  /* 투두리스트 추가 함수 */
  const addTodo = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("access_token");
    if (todoInput === "") {
      alert("할 일을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: todoInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setTodos((current) => [...current, response.data]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setTodoInput("");
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
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
        {todos.map((item) => (
          <TodoItem
            text={item.todo}
            id={item.id}
            key={item.id}
            isCompleted={item.isCompleted}
            userId={item.userId}
          />
        ))}
      </div>
    </>
  );
};

export { TodoList };
