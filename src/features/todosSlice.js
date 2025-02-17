// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentSection: 'personal', // Starting with the 'personal' section
//   items: [],
// };

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     setCurrentSection(state, action) {
//       state.currentSection = action.payload;
//     },
//     addTodo(state, action) {
//       const newTodo = {
//         id: Date.now(), // Unique ID for each task based on the timestamp
//         todoText: action.payload.todoText,
//         section: action.payload.section,
//         completed: false,
//       };
//       state.items.push(newTodo);
//     },
//     toggleTodoCompletion(state, action) {
//       const todo = state.items.find(todo => todo.id === action.payload);
//       if (todo) {
//         todo.completed = !todo.completed;
//       }
//     },
//     deleteTodo(state, action) {
//       state.items = state.items.filter(todo => todo.id !== action.payload);
//     },
//     clearCompleted(state, action) {
//       const section = action.payload;
//       // Remove completed tasks only from the current section
//       state.items = state.items.filter(todo => !(todo.section === section && todo.completed));
//     },
//   },
// });

// export const { setCurrentSection, addTodo, toggleTodoCompletion, deleteTodo, clearCompleted } = todosSlice.actions;

// export default todosSlice.reducer;







import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSection: 'personal', // Starting with the 'personal' section
  items: JSON.parse(localStorage.getItem('todos')) || [], // Load todos from localStorage if available
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
        id: Date.now(), // Unique ID for each task based on the timestamp
        todoText: action.payload.todoText,
        section: action.payload.section,
        completed: false,
      };
      state.items.push(newTodo);
      // Save the updated todos in localStorage
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    toggleTodoCompletion(state, action) {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        // Save the updated todos in localStorage
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      // Save the updated todos in localStorage
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    clearCompleted(state, action) {
      const section = action.payload;
      // Remove completed tasks only from the current section
      state.items = state.items.filter(todo => !(todo.section === section && todo.completed));
      // Save the updated todos in localStorage
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
  },
});

export const { setCurrentSection, addTodo, toggleTodoCompletion, deleteTodo, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
