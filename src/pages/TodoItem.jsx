const TodoItem = ({ text, isCompleted }) => {
  return (
    <div>
      <li>
        <label>
          <input type="checkbox" checked={isCompleted} />
          <span>{text}</span>
        </label>
      </li>
    </div>
  );
};

export { TodoItem };
