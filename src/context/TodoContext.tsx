import React, { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'usehooks-ts';

// Define an interface for the TodoContextProps
interface TodoContextProps {
  todos: string[];
  addTodo: (text: string) => void;
}

// Create the TodoContext
export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

// Provide the context
export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);
  
  const addTodo = (text: string) => {
    setTodos([...todos, text]);
  }

  // Create the value for the context
  const value: TodoContextProps = {
    todos,
    addTodo,
  }

  // Provide the context value
  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}
