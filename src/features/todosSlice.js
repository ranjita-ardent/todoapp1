import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSection: 'personal',
  items: [],
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
        todoText: action.payload.todoText,
        section: action.payload.section,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodoCompletion(state, action) {
      const todo = state.items.find(todo => todo.todoText === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(todo => todo.todoText !== action.payload);
    },
    clearCompleted(state) {
      state.items = state.items.filter(todo => !todo.completed);
    },
  },
});

export const { setCurrentSection, addTodo, toggleTodoCompletion, deleteTodo, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
