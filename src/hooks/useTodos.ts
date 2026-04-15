import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchTodosAsync,
    createTodoAsync,
    toggleTodoAsync,
    deleteTodoAsync,
    updateTodoAsync,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
    clearError
} from '../store/todoSlice';
import { useEffect } from 'react';
import type { FilterStatus, SortOrder, Todo } from '../types/todo';

export const useTodos = () => {
    const dispatch = useAppDispatch();
    const {
        todos,
        loading,
        error,
        currentPage,
        itemsPerPage,
        filter,
        total,
        totalPages
    } = useAppSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodosAsync({
            page: currentPage,
            limit: itemsPerPage,
            filter
        }));
    }, [dispatch, currentPage, itemsPerPage, filter]);

    const addTodo = (text: string) => {
        dispatch(createTodoAsync(text));
    };

    const toggleTodo = (id: number) => {
        dispatch(toggleTodoAsync(id));
    };

    const deleteTodo = (id: number) => {
        dispatch(deleteTodoAsync(id));
    };

    const editTodo = (id: number, newText: string) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            dispatch(updateTodoAsync({ id, text: newText, completed: todo.completed }));
        }
    };

    const changePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const changeItemsPerPage = (limit: number) => {
        dispatch(setItemsPerPage(limit));
    };

    const changeFilter = (newFilter: FilterStatus) => {
        dispatch(setFilter(newFilter));
    };

    const clearErrorMsg = () => {
        dispatch(clearError());
    };

    const getSortedTodos = (todosList: Todo[], sortOrder: SortOrder): Todo[] => {
        return [...todosList].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };


    const getCounts = (todosList: Todo[]) => ({
        all: total,
        active: todosList.filter(t => !t.completed).length,
        completed: todosList.filter(t => t.completed).length
    });

    return {
        todos,
        loading,
        error,
        currentPage,
        itemsPerPage,
        filter,
        total,
        totalPages,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        changePage,
        changeItemsPerPage,
        changeFilter,
        clearErrorMsg,
        getSortedTodos,
        getCounts
    };
};