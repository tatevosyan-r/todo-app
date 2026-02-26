import React from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { type  Todo } from '../../types/todo';

interface TodoItemProps {
    todo: Todo;
    mode: 'light' | 'dark';
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
                                                      todo,
                                                      mode,
                                                      onToggle,
                                                      onDelete,
                                                      onEdit
                                                  }) => {
    return (
        <ListItem
            sx={{
                mb: 1,
                borderRadius: 1,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                    bgcolor: mode === 'light'
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'rgba(255, 255, 255, 0.02)',
                    transform: 'translateY(-1px)',
                    boxShadow: 1,
                }
            }}
            secondaryAction={
                <Box>
                    <IconButton
                        edge="end"
                        onClick={() => onEdit(todo)}
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        onClick={() => onDelete(todo.id)}
                        color="error"
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >
            <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                color="primary"
            />
            <ListItemText
                primary={todo.text}
                secondary={new Date(todo.createdAt).toLocaleString()}
                sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
            />
        </ListItem>
    );
};