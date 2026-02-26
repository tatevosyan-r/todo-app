
import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';
import type { Todo, FilterStatus, SortOrder } from '../types/todo';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(storage.getTodos);

    useEffect(() => {
        storage.saveTodos(todos);
    }, [todos]);

    const addTodo = (text: string) => {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString(),
            }
        ]);
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const getFilteredTodos = (todos: Todo[], filterStatus: FilterStatus, sortOrder: SortOrder) => {
        let filtered = todos;
        if (filterStatus === 'completed') {
            filtered = todos.filter(todo => todo.completed);
        } else if (filterStatus === 'active') {
            filtered = todos.filter(todo => !todo.completed);
        }

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    const getCounts = (todos: Todo[]) => ({
        all: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length
    });

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        getFilteredTodos,
        getCounts
    };
};