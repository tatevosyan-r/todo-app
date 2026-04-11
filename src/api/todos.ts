import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface TodoResponse {
    data: Todo[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

export const fetchTodos = async (
    page: number,
    limit: number,
    filter: "active" | "completed" | "all"
): Promise<TodoResponse> => {
    const response = await axios.get(`${API_URL}/todos`, {
        params: { page, limit, filter }
    });
    return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, { text });
    return response.data;
};

export const updateTodo = async (id: number, text: string, completed: boolean): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, { text, completed });
    return response.data;
};

export const toggleTodoStatus = async (id: number): Promise<Todo> => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
    return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
};