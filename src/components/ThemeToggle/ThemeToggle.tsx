import React from 'react';
import { Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ThemeToggleProps {
    mode: 'light' | 'dark';
    onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle }) => {
    return (
        <Button
            color="inherit"
            onClick={onToggle}
            startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            sx={{ minWidth: 'auto' }}
        >
            {mode === 'light' ? 'Светлая' : 'Тёмная'}
        </Button>
    );
};