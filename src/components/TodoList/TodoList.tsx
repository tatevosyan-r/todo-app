import React from 'react';
import {
    List,
    Box,
    Typography
} from '@mui/material';
import { TodoItem } from '../TodoItem/TodoItem';
import { type Todo } from '../../types/todo';

interface TodoListProps {
    todos: Todo[];
    mode: 'light' | 'dark';
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

// Выносим компонент пустого состояния для читаемости
const EmptyState: React.FC = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
            📭 Список задач пуст
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Добавьте новую задачу в поле выше!
        </Typography>
    </Box>
);

export const TodoList: React.FC<TodoListProps> = ({
                                                      todos,
                                                      mode,
                                                      onToggle,
                                                      onDelete,
                                                      onEdit
                                                  }) => {
    // Показываем пустое состояние, если задач нет
    if (todos.length === 0) {
        return <EmptyState />;
    }

    return (
        <List>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    mode={mode}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </List>
    );
};