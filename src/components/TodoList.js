import React from 'react';
import { FaTrash } from 'react-icons/fa';

function TodoList({ section, todos, onClearCompleted, onTodoClick, onDeleteClick, isSectionEmpty, isTodoCleared }) {
  const completedTasks = todos.filter(todo => todo.completed);
  const isTodoListEmpty = todos.length === 0;

  return (
    <div className={`todo-container ${(!isTodoListEmpty || isTodoCleared) ? 'visible' : ''}`}>
      {/* Loop through each todo */}
      {todos.map((todo, index) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {/* Radio Button to toggle completion */}
          <input
            type="radio"
            checked={todo.completed}
            onChange={() => onTodoClick(todo.id)} // Use the unique id
          />
          {/* Todo Text */}
          <span
            className={`todo-text ${todo.completed ? 'line-through' : ''}`}
            onClick={() => onTodoClick(todo.id)} // Use the unique id
          >
            {todo.todoText}
          </span>
          {/* Trash Icon to delete the todo */}
          <FaTrash
            className="trash-icon"
            onClick={() => onDeleteClick(todo.id)} // Use the unique id
          />
          <div className="todo-line"></div>
        </div>
      ))}

      {/* Show Clear Completed Tasks button if there are completed tasks or any tasks */}
      {(completedTasks.length > 0 || !isTodoListEmpty || isTodoCleared) && (
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
