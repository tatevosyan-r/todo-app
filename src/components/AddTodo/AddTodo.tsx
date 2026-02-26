import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAdd = () => {
        if (newTodo.trim()) {
            onAdd(newTodo.trim());
            setNewTodo('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Введите новую задачу..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                size="small"
            />
            <Button
                variant="contained"
                onClick={handleAdd}
                disabled={!newTodo.trim()}
                startIcon={<AddIcon />}
                sx={{ minWidth: '120px' }}
            >
                Добавить
            </Button>
        </Box>
    );
};