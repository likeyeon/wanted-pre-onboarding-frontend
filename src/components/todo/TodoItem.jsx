import { useState } from "react";
import axios from "axios";

const TodoItem = ({ text, isCompleted, id, todos, setTodos, item }) => {
  // console.log(isChecked);
  // console.log(isCompleted);
  const [isChecked, setIsChecked] = useState(isCompleted); // 체크 여부
  const [isEdit, setIsEdit] = useState(false); //수정 상태
  const [editedTodo, setEditedTodo] = useState(text); //수정

  /* todo 체크 표시 */
  const checkTodo = () => {
    setIsChecked(!isChecked);
    updateTodo(!isChecked);
  };

  /* todo 삭제 */
  const handleDelete = async () => {
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
  };

  /* todo 수정버튼 */
  const handleEdit = () => {
    setIsEdit(true);
  };

  /* todo 수정 */
  const editTodo = (e) => {
    setEditedTodo(e.target.value);
  };

  /* todo 수정 취소 */
  const handleCancle = () => {
    setIsEdit(false);
    setEditedTodo(item.todo);
  };

  /* todo 제출 버튼 */
  const handleSubmit = () => {
    updateTodo(isChecked);
  };

  /* todo 수정 제출 */
  const updateTodo = async (isChecked) => {
    let token = localStorage.getItem("access_token");
    try {
      const res = await axios.put(
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
      console.log(isCompleted);
      console.log(res);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <li>
        <label>
          <input
            type="checkbox"
            onChange={checkTodo}
            checked={isChecked}
            value={id}
          />
          {isEdit ? (
            <input
              data-testid="modify-input"
              value={editedTodo}
              onChange={editTodo}
            />
          ) : (
            <span>{item.todo}</span>
          )}
        </label>
        {isEdit ? (
          <>
            <button data-testid="submit-button" onClick={handleSubmit}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleCancle}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={handleEdit}>
              수정
            </button>
            <button data-testid="delete-button" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </li>
    </div>
  );
};

export { TodoItem };
