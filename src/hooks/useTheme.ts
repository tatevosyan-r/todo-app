
import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

export const useTheme = () => {
    const [mode, setMode] = useState<'light' | 'dark'>(storage.getTheme);

    useEffect(() => {
        storage.saveTheme(mode);
    }, [mode]);

    const toggleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return { mode, toggleMode };
};