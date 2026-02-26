import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import {type  Todo } from '../../types/todo';

interface EditTodoProps {
    open: boolean;
    todo: Todo | null;
    onClose: () => void;
    onSave: (id: number, newText: string) => void;
}

export const EditTodo: React.FC<EditTodoProps> = ({
                                                      open,
                                                      todo,
                                                      onClose,
                                                      onSave
                                                  }) => {
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (todo) {
            setEditText(todo.text);
        }
    }, [todo]);

    const handleSave = () => {
        if (editText.trim() && todo) {
            onSave(todo.id, editText.trim());
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактирование задачи</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Текст задачи"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    helperText="Нажмите Ctrl+Enter (Cmd+Enter) для сохранения"
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!editText.trim()}
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};