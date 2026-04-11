import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodoStatus } from '../api/todos';
import type { Todo } from '../api/todos';

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    filter: 'all' | 'active' | 'completed';
    total: number;
    totalPages: number;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 5,
    filter: 'all',
    total: 0,
    totalPages: 0,
};

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async ({ page, limit, filter }: { page: number; limit: number; filter: 'all' | 'active' | 'completed' }) => {
        const response = await fetchTodos(page, limit, filter);
        return response;
    }
);

export const createTodoAsync = createAsyncThunk(
    'todos/createTodo',
    async (text: string, { dispatch, getState }) => {
        await createTodo(text);

        const state: any = getState();
        const { currentPage, itemsPerPage, filter, total } = state.todos;

        const newTotal = total + 1;
        const maxOnCurrentPage = currentPage * itemsPerPage;
        let newPage = currentPage;

        if (newTotal > maxOnCurrentPage) {
            const newTotalPages = Math.ceil(newTotal / itemsPerPage);
            newPage = newTotalPages;
        }

        await dispatch(fetchTodosAsync({ page: newPage, limit: itemsPerPage, filter }));

        if (newPage !== currentPage) {
            dispatch(setCurrentPage(newPage));
        }
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, text, completed }: { id: number; text: string; completed: boolean }, { dispatch, getState }) => {
        await updateTodo(id, text, completed);
        const state: any = getState();
        const { currentPage, itemsPerPage, filter } = state.todos;
        await dispatch(fetchTodosAsync({ page: currentPage, limit: itemsPerPage, filter }));
    }
);

export const toggleTodoAsync = createAsyncThunk(
    'todos/toggleTodo',
    async (id: number, { dispatch, getState }) => {
        await toggleTodoStatus(id);
        const state: any = getState();
        const { currentPage, itemsPerPage, filter } = state.todos;
        await dispatch(fetchTodosAsync({ page: currentPage, limit: itemsPerPage, filter }));
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { dispatch, getState }) => {
        await deleteTodo(id);
        const state: any = getState();
        let { currentPage, itemsPerPage, filter, todos } = state.todos;

        if (todos.length === 1 && currentPage > 1) {
            currentPage = currentPage - 1;
            dispatch(setCurrentPage(currentPage));
        }

        await dispatch(fetchTodosAsync({ page: currentPage, limit: itemsPerPage, filter }));
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1;
        },
        setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
            state.filter = action.payload;
            state.currentPage = 1;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.data;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки задач';
            })
            .addCase(createTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTodoAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка создания задачи';
            })
            .addCase(updateTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTodoAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка обновления задачи';
            })
            .addCase(toggleTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleTodoAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(toggleTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка изменения статуса';
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodoAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка удаления задачи';
            });
    },
});

export const { setCurrentPage, setItemsPerPage, setFilter, clearError } = todoSlice.actions;
export default todoSlice.reducer;