import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoCompletion } from '../features/todosSlice';

const TodoItem = ({ todo, section }) => {
  const dispatch = useDispatch();

  // Handle radio button click to toggle completion status
  const handleComplete = () => {
    dispatch(toggleTodoCompletion({ id: todo.id, section })); // Pass the unique ID
  };

  // Handle delete button click to delete the todo from the current section
  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id, section })); // Pass the unique ID
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="radio"
        className="todo-radio"
        checked={todo.completed}
        onChange={handleComplete}
      />
      <label
        className={`todo-text ${todo.completed ? 'line-through' : ''}`}
        onClick={handleComplete}
      >
        {todo.todoText}
      </label>
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="todo-delete"
        onClick={handleDelete}
      />
    </div>
  );
};

export default TodoItem;
