import { useContext } from 'react';
import { TodoContext } from './TodoContext';

// Create custom hook to use within components
export const useTodo = () => {
  // Call the useContext hook to consume the context
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('UseTodo must be used within a TodoProvider');
  }

  return context;
}
