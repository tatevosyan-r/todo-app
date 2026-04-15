import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Snackbar,
    Box
} from '@mui/material';

import { TodoList } from './components/TodoList/TodoList';
import { AddTodo } from './components/AddTodo/AddTodo';
import { EditTodo } from './components/EditTodo/EditTodo';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { TodoPagination } from './components/TodoPagination/TodoPagination';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { useFilters } from './hooks/useFilters';
import { useEditDialog } from './hooks/useEditDialog';

function App() {
    const { mode, toggleMode } = useTheme();
    const { sortOrder, setSortOrder } = useFilters();
    const {
        todos,
        loading,
        error,
        currentPage,
        itemsPerPage,
        totalPages,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        changePage,
        changeItemsPerPage,
        changeFilter,
        clearErrorMsg,
        getSortedTodos,
        getCounts
    } = useTodos();
    const { editDialogOpen, editingTodo, openEditDialog, closeEditDialog } = useEditDialog();

    // Получаем отсортированные задачи
    const sortedTodos = getSortedTodos(todos, sortOrder);
    const counts = getCounts();

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#1976d2' : '#90caf9',
            },
        },
        components: {
            MuiIconButton: { styleOverrides: { root: { '&:focus': { outline: 'none' } } } },
            MuiButton: { styleOverrides: { root: { '&:focus': { outline: 'none' } } } },
            MuiToggleButton: { styleOverrides: { root: { '&:focus': { outline: 'none' } } } }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        margin: 0,
                        padding: 0,
                        backgroundColor: theme.palette.background.default,
                    },
                    '#root': {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}
            />

            <Container maxWidth="md" sx={{ py: 4 }}>
                <AppBar position="static" sx={{ mb: 3, borderRadius: 1 }}>
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            📋 Список задач
                        </Typography>
                        <ThemeToggle
                            mode={mode}
                            onToggle={toggleMode}
                        />
                    </Toolbar>
                </AppBar>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <AddTodo onAdd={addTodo} />

                    <TodoFilters
                        filterStatus={filter}
                        sortOrder={sortOrder}
                        counts={counts}
                        onFilterChange={changeFilter}  // Меняем фильтр в Redux
                        onSortChange={setSortOrder}
                    />

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!loading && (
                        <>
                            <TodoList
                                todos={sortedTodos}  // Используем отсортированные задачи
                                mode={mode}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={openEditDialog}
                            />

                            {totalPages > 0 && (
                                <TodoPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={changePage}
                                    onItemsPerPageChange={changeItemsPerPage}
                                />
                            )}
                        </>
                    )}
                </Paper>
            </Container>

            <EditTodo
                open={editDialogOpen}
                todo={editingTodo}
                onClose={closeEditDialog}
                onSave={editTodo}
            />

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={clearErrorMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={clearErrorMsg} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default App;