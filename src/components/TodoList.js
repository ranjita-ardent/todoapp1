import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon

function TodoList({ section, todos, onClearCompleted, onTodoClick, onDeleteClick, isSectionEmpty }) {
  const completedTasks = todos.filter(todo => todo.completed);
  const isTodoListEmpty = todos.length === 0;

  return (
    <div className={`todo-container ${(!isTodoListEmpty || completedTasks.length > 0) ? 'visible' : ''}`}>
      {todos.map((todo, index) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {/* Radio Button to toggle completion */}
          <input
            type="radio"
            checked={todo.completed}
            onChange={() => onTodoClick(todo.id)} // Pass the ID for toggling completion
          />

          {/* Todo Text */}
          <span
            className={`todo-text ${todo.completed ? 'line-through' : ''}`}
            onClick={() => onTodoClick(todo.id)} // Pass the ID for toggling completion
          >
            {todo.todoText}
          </span>

          {/* Trash Icon to delete the todo */}
          <FaTrash
            className="trash-icon"
            onClick={() => onDeleteClick(todo.id)} // Pass the ID for deleting the todo
          />

          <div className="todo-line"></div>
        </div>
      ))}

      {(completedTasks.length > 0 || !isTodoListEmpty) && (
        <div className="clear-completed-container">
          <div className="clear-completed" onClick={onClearCompleted}>
            Clear Completed Tasks
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
