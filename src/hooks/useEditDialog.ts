
import { useState } from 'react';
import type { Todo } from '../types/todo';

export const useEditDialog = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const openEditDialog = (todo: Todo) => {
        setEditingTodo(todo);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setEditingTodo(null);
    };

    return {
        editDialogOpen,
        editingTodo,
        openEditDialog,
        closeEditDialog
    };
};