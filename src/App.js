import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSection, addTodo, toggleTodoCompletion, clearCompleted, deleteTodo } from './features/todosSlice';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [todoInput, setTodoInput] = useState('');
  const [isTodoCleared, setIsTodoCleared] = useState(false); // Track if todos were cleared

  useEffect(() => {
    // Automatically hide todo container if the selected section is empty
    const filteredTodos = todos.items.filter(todo => todo.section === todos.currentSection);
    const isSectionEmpty = filteredTodos.length === 0;
    const todoContainer = document.querySelector('.todo-container');

    if (isSectionEmpty && !isTodoCleared) {
      todoContainer.classList.remove('visible'); // Hide container if section is empty
    } else {
      todoContainer.classList.add('visible'); // Show container if there are tasks or completed tasks
    }
  }, [todos.items, todos.currentSection, isTodoCleared]); // Re-run when todos, section or cleared status change

  // Function to handle section change (personal/professional)
  const handleSectionChange = (section) => {
    dispatch(setCurrentSection(section));
    setIsTodoCleared(false); // Reset cleared state when changing sections
  };

  // Handle adding new todo
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

  // Handle toggling todo completion
  const handleTodoClick = (todoText) => {
    dispatch(toggleTodoCompletion(todoText));
  };

  // Handle deleting todo
  const handleDeleteTodo = (todoText) => {
    dispatch(deleteTodo(todoText));
  };

  // Handle clearing completed todos
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
    setIsTodoCleared(true); // Mark that the todos have been cleared
  };

  // Get todos for the selected section
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

        {/* Conditionally render TodoList for Personal and Professional Sections */}
        {(todos.currentSection === 'personal' || todos.currentSection === 'professional') && (
          <TodoList
            section={todos.currentSection}
            todos={filteredTodos}
            onTodoClick={handleTodoClick}
            onDeleteClick={handleDeleteTodo}
            onClearCompleted={handleClearCompleted}
            isSectionEmpty={isSectionEmpty}  
            isTodoCleared={isTodoCleared} // Pass the cleared status
          />
        )}
      </main>
    </div>
  );
}

export default App;
