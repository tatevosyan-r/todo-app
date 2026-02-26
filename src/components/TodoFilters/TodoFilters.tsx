import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import type { FilterStatus, SortOrder } from '../../types/todo';

interface TodoFiltersProps {
    filterStatus: FilterStatus;
    sortOrder: SortOrder;
    counts: {
        all: number;
        active: number;
        completed: number;
    };
    onFilterChange: (filter: FilterStatus) => void;
    onSortChange: (sort: SortOrder) => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
                                                            filterStatus,
                                                            sortOrder,
                                                            counts,
                                                            onFilterChange,
                                                            onSortChange
                                                        }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            flexWrap: 'wrap',
            gap: 1
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon color="action" sx={{ mr: 0.5 }} />
                <ToggleButtonGroup
                    value={filterStatus}
                    exclusive
                    onChange={(_, newFilter) => newFilter && onFilterChange(newFilter)}
                    size="small"
                >
                    <ToggleButton value="all">
                        Все ({counts.all})
                    </ToggleButton>
                    <ToggleButton value="active">
                        Активные ({counts.active})
                    </ToggleButton>
                    <ToggleButton value="completed">
                        Готовые ({counts.completed})
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SortIcon color="action" />
                <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={(_, newOrder) => newOrder && onSortChange(newOrder)}
                    size="small"
                >
                    <ToggleButton value="newest">
                        Сначала новые
                    </ToggleButton>
                    <ToggleButton value="oldest">
                        Сначала старые
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
};