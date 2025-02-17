import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteTodo, markCompleted } from '../features/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id }));
  };

  const handleComplete = () => {
    dispatch(markCompleted({ id: todo.id }));
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="radio"
        className="todo-radio"
        checked={todo.completed}
        onChange={handleComplete}
      />
      <label>{todo.todoText}</label>
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="todo-delete"
        onClick={handleDelete}
      />
    </div>
  );
};

export default TodoItem;
