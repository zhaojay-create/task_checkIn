import React, { useEffect, useState } from "react";
import "./TodoList.css"; // 添加这行导入CSS

const showTextByStatus = {
  done: "已完成",
  undone: "未完成",
};

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="添加任务"
          className="todo-input"
        />
        <button
          className="todo-add-button"
          onClick={() => {
            if (inputValue.trim() !== "") {
              const newTodo = {
                id: Date.now(),
                text: inputValue,
                status: "undone",
              };
              setTodos((pre) => [...pre, newTodo]);
              setInputValue("");
            }
          }}
        >
          添加
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="todo-empty">暂无任务，添加任务</p>
      ) : (
        <ul className="todo-list">
          {todos.map(({ id, text, status }) => (
            <li key={id} className="todo-item">
              <div className={`todo-status ${status}`}>
                {showTextByStatus[status]}
              </div>
              <div className="todo-text">{text}</div>
              <button
                className="todo-toggle-button"
                onClick={() => {
                  setTodos((pre) =>
                    pre.map((todo) =>
                      todo.id === id
                        ? {
                            ...todo,
                            status: status === "undone" ? "done" : "undone",
                          }
                        : todo
                    )
                  );
                }}
              >
                {status === "undone" ? "✅" : "❌"}
              </button>
              <button
                className="todo-delete-button"
                onClick={() => {
                  setTodos((pre) => pre.filter((todo) => todo.id !== id));
                }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
