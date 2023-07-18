import React, { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'usehooks-ts';

// Define an interface for the TodoContextProps
interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  updateTodoStatus: (id: string) => void
}

// Add an interface for the to do items
export interface Todo {
  id: string
  text: string
  status: 'incomplete' | 'completed'
}

// Create the TodoContext
export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

// Provide the context
export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  // addTodo functionality
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      status: 'incomplete',
    }

    setTodos([...todos, newTodo]);
  }

  // deleteTodo functionality
  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  // editTodo functionality
  const editTodo = (id: string, text: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, text }
        }
        return todo;
      });
    });
  }

  // updateTodoStatus functionality
  const updateTodoStatus = (id: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            status: todo.status === 'incomplete' ? 'completed' : 'incomplete',
          }
        }
        return todo;
      });
    });
  }

  // Create the value for the context
  const value: TodoContextProps = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
  }

  // Provide the context value
  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}
