import {type Todo } from '../types/todo';

const STORAGE_KEYS = {
    TODOS: 'todos',
    THEME: 'theme'
} as const;

export const storage = {
    getTodos: (): Todo[] => {
        const savedTodos = localStorage.getItem(STORAGE_KEYS.TODOS);
        return savedTodos ? JSON.parse(savedTodos) : [];
    },

    saveTodos: (todos: Todo[]): void => {
        localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
    },

    getTheme: (): 'light' | 'dark' => {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    saveTheme: (theme: 'light' | 'dark'): void => {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
};