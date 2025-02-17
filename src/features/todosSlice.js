import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSection: 'personal',
  items: JSON.parse(localStorage.getItem('todos')) || [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentSection(state, action) {
      state.currentSection = action.payload;
    },
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(), // Unique ID for each todo
        todoText: action.payload.todoText,
        section: action.payload.section,
        completed: false,
      };
      state.items.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    toggleTodoCompletion(state, action) {
      const { id } = action.payload; // Use the unique ID
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    deleteTodo(state, action) {
      const { id } = action.payload; // Use the unique ID
      state.items = state.items.filter(todo => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    clearCompleted(state) {
      state.items = state.items.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
  },
});

export const { setCurrentSection, addTodo, toggleTodoCompletion, deleteTodo, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
