import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todosSlice';

// Configure Redux store
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
