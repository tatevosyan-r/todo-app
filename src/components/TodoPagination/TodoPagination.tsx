import React from 'react';
import {
    Box,
    Pagination,
    FormControl,
    Select,
    MenuItem,
    Typography,
    Stack
} from '@mui/material';

interface TodoPaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (limit: number) => void;
}

export const TodoPagination: React.FC<TodoPaginationProps> = ({
                                                                  currentPage,
                                                                  totalPages,
                                                                  itemsPerPage,
                                                                  onPageChange,
                                                                  onItemsPerPageChange
                                                              }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
        }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    Задач на странице:
                </Typography>
                <FormControl size="small">
                    <Select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        sx={{ minWidth: 70 }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
            />
        </Box>
    );
};