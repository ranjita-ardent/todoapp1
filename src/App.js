import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSection, addTodo, toggleTodoCompletion, clearCompleted, deleteTodo } from './features/todosSlice';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [todoInput, setTodoInput] = useState('');
  const [isTodoCleared, setIsTodoCleared] = useState(false);

  // Update visibility of the todo container based on section's task status
  useEffect(() => {
    const filteredTodos = todos.items.filter(todo => todo.section === todos.currentSection);
    const isSectionEmpty = filteredTodos.length === 0;
    const todoContainer = document.querySelector('.todo-container');

    if (isSectionEmpty && !isTodoCleared) {
      todoContainer.classList.remove('visible');
    } else {
      todoContainer.classList.add('visible');
    }
  }, [todos.items, todos.currentSection, isTodoCleared]);

  const handleSectionChange = (section) => {
    dispatch(setCurrentSection(section));
    setIsTodoCleared(false);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      dispatch(addTodo({
        todoText: todoInput.trim(),
        section: todos.currentSection,
      }));
      setTodoInput('');
    } else {
      alert('Please enter a task before clicking Add!');
    }
  };

  const handleTodoClick = (id) => {
    dispatch(toggleTodoCompletion(id)); // Use ID for toggling completion
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id)); // Use ID for deleting
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted(todos.currentSection)); // Pass section to clear completed tasks
    setIsTodoCleared(true);
  };

  const filteredTodos = todos.items.filter(todo => todo.section === todos.currentSection);
  const isSectionEmpty = filteredTodos.length === 0;

  return (
    <div className="App">
      <nav className="navbar-container">
        <img src="logo.png" alt="logo" className="logo" />
      </nav>

      <main>
        <div className="personal-professional-section">
          <div
            className={`personal ${todos.currentSection === 'personal' ? 'active' : ''}`}
            onClick={() => handleSectionChange('personal')}
          >
            Personal
          </div>
          <div
            className={`professional ${todos.currentSection === 'professional' ? 'active' : ''}`}
            onClick={() => handleSectionChange('professional')}
          >
            Professional
          </div>
        </div>

        <form className="to-do-addbtn-txtField" onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button type="submit">ADD</button>
        </form>

        <TodoList
          section={todos.currentSection}
          todos={filteredTodos}
          onTodoClick={handleTodoClick}
          onDeleteClick={handleDeleteTodo}
          onClearCompleted={handleClearCompleted}
          isSectionEmpty={isSectionEmpty}
        />
      </main>
    </div>
  );
}

export default App;
