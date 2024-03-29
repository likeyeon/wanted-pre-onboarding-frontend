import React, { useState, useCallback } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

/* todo 리스트 개별 목록 */
const TodoItem = ({ isCompleted, id, todos, setTodos, item }) => {
  const [isChecked, setIsChecked] = useState(isCompleted); // 체크 여부
  const [isEdit, setIsEdit] = useState(false); //수정 상태
  const [editedTodo, setEditedTodo] = useState(item.todo); //수정된 텍스트

  /* todo 체크 표시 */
  const checkTodo = () => {
    setIsChecked(!isChecked);
    updateTodo(!isChecked);
  };

  /* todo 삭제 */
  const handleDelete = useCallback(async () => {
    let token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTodos(todos.filter((it) => it.id !== id));
    } catch (err) {
      console.log(err);
    }
  }, [setTodos, id, todos]);

  /* todo 수정, 취소, 제출 */
  const handleEdit = () => {
    setIsEdit(true);
  };

  const editTodo = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleCancle = () => {
    setIsEdit(false);
    setEditedTodo(item.todo);
  };

  const handleSubmit = () => {
    updateTodo(isChecked);
  };

  const updateTodo = useCallback(
    async (isChecked) => {
      let token = localStorage.getItem("access_token");
      try {
        await axios.put(
          `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
          { todo: editedTodo, isCompleted: isChecked },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setTodos(
          todos.map((it) =>
            it.id === id
              ? { ...it, todo: editedTodo, isCompleted: isChecked }
              : it
          )
        );
        setIsEdit(false);
      } catch (err) {
        console.log(err);
      }
    },
    [setTodos, editedTodo, setIsEdit, id, todos]
  );

  return (
    <>
      <li className="list-none w-full flex p-2 rounded bg-blue-100 my-2">
        <label className="flex w-full items-center">
          <input
            type="checkbox"
            onChange={checkTodo}
            checked={isChecked}
            value={id}
            className="w-5 h-5 mr-1"
          />
          {isEdit ? (
            <input
              data-testid="modify-input"
              value={editedTodo}
              onChange={editTodo}
              className="w-full bg-blue-100"
            />
          ) : (
            <span className={isChecked ? "w-full line-through" : "w-full"}>
              {item.todo}
            </span>
          )}
        </label>
        {isEdit ? (
          <div className="flex">
            <button data-testid="submit-button" onClick={handleSubmit}>
              <CheckIcon className="w-5 h-5 mr-1" />
            </button>
            <button data-testid="cancel-button" onClick={handleCancle}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex">
            <button data-testid="modify-button" onClick={handleEdit}>
              <PencilIcon className="w-5 h-5 mr-1" />
            </button>
            <button data-testid="delete-button" onClick={handleDelete}>
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default React.memo(TodoItem);
