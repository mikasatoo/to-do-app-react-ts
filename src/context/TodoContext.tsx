import React, { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'usehooks-ts';

// Define an interface for the TodoContextProps
interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
}

// Add an interface for the to do items
export interface Todo {
  id: string
  text: string
  status: 'incomplete' | 'complete'
}

// Create the TodoContext
export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

// Provide the context
export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // addTodo functionality
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      status: 'incomplete',
    }

    setTodos([...todos, newTodo]);
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
