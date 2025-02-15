import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon

function TodoList({ section, todos, onClearCompleted, onTodoClick, onDeleteClick, isSectionEmpty, isTodoCleared }) {
  const completedTasks = todos.filter(todo => todo.completed);
  const isTodoListEmpty = todos.length === 0;

  useEffect(() => {
    // Hide the todo container if the section is empty when we switch sections
    const todoContainer = document.querySelector('.todo-container');
    
    if (isSectionEmpty && !isTodoCleared) {
      todoContainer.classList.remove('visible'); // Hide if no todos
    } else {
      todoContainer.classList.add('visible'); // Show if there are todos or completed tasks
    }
  }, [isSectionEmpty, isTodoCleared]);

  return (
    <div className={`todo-container ${(!isTodoListEmpty || isTodoCleared) ? 'visible' : ''}`}>
      {/* Loop through each todo */}
      {todos.map((todo, index) => (
        <div key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {/* Radio Button to toggle completion */}
          <input
            type="radio"
            checked={todo.completed}
            onChange={() => onTodoClick(todo.todoText)} // Toggle completion
          />

          {/* Todo Text */}
          <span
            className={`todo-text ${todo.completed ? 'line-through' : ''}`}
            onClick={() => onTodoClick(todo.todoText)} // Toggle completion on text click as well
          >
            {todo.todoText}
          </span>

          {/* Trash Icon to delete the todo */}
          <FaTrash
            className="trash-icon"
            onClick={() => onDeleteClick(todo.todoText)} // Delete the todo
          />

          {/* Blue horizontal line below each todo item (block level) */}
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
