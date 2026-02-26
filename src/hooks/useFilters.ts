
import { useState } from 'react';
import type { FilterStatus, SortOrder } from '../types/todo';

export const useFilters = () => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    return {
        sortOrder,
        filterStatus,
        setSortOrder,
        setFilterStatus
    };
};