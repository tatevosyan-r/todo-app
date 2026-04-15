import { useState, useEffect } from 'react';
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

    // Состояния для счетчиков
    const [counts, setCounts] = useState({
        all: 0,
        active: 0,
        completed: 0
    });

    useEffect(() => {
        dispatch(fetchTodosAsync({
            page: currentPage,
            limit: itemsPerPage,
            filter
        }));
    }, [dispatch, currentPage, itemsPerPage, filter]);

    // Функция для получения актуальных счетчиков с сервера
    const fetchCounts = async () => {
        try {
            // Получаем все задачи без пагинации
            const response = await fetch('http://193.124.67.242/api/todos?limit=10000');
            const data = await response.json();
            const allTasks: Todo[] = data.data;

            setCounts({
                all: allTasks.length,
                active: allTasks.filter((t: Todo) => !t.completed).length,
                completed: allTasks.filter((t: Todo) => t.completed).length
            });
        } catch (error) {
            console.error('Ошибка загрузки счетчиков:', error);
        }
    };

    // Загружаем счетчики при монтировании и после каждого изменения задач
    useEffect(() => {
        fetchCounts();
    }, [total]); // Перезагружаем когда общее количество меняется

    const addTodo = async (text: string) => {
        await dispatch(createTodoAsync(text));
        await fetchCounts(); // Обновляем счетчики после добавления
    };

    const toggleTodo = async (id: number) => {
        await dispatch(toggleTodoAsync(id));
        await fetchCounts(); // Обновляем счетчики после изменения статуса
    };

    const deleteTodo = async (id: number) => {
        await dispatch(deleteTodoAsync(id));
        await fetchCounts(); // Обновляем счетчики после удаления
    };

    const editTodo = async (id: number, newText: string) => {
        const todo = todos.find((t: Todo) => t.id === id);
        if (todo) {
            await dispatch(updateTodoAsync({ id, text: newText, completed: todo.completed }));
            await fetchCounts(); // Обновляем счетчики после редактирования
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
        return [...todosList].sort((a: Todo, b: Todo) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    const getCounts = () => counts;

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