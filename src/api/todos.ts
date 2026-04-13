import axios from 'axios';
import type { Todo, FilterStatus } from '../types/todo';

export interface TodoResponse {
    data: Todo[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}


const API_URL = 'https://todo-app-xlee.onrender.com';

export const fetchTodos = async (
    page: number,
    limit: number,
    filter: FilterStatus
): Promise<TodoResponse> => {
    const response = await axios.get<TodoResponse>(`${API_URL}/todos`, {
        params: { page, limit, filter }
    });
    return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
    const response = await axios.post<Todo>(`${API_URL}/todos`, { text });
    return response.data;
};

export const updateTodo = async (id: number, text: string, completed: boolean): Promise<Todo> => {
    const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, { text, completed });
    return response.data;
};

export const toggleTodoStatus = async (id: number): Promise<Todo> => {
    const response = await axios.patch<Todo>(`${API_URL}/todos/${id}/toggle`);
    return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
};