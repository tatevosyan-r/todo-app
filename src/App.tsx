
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Paper
} from '@mui/material';

import { TodoList } from './components/TodoList/TodoList';
import { AddTodo } from './components/AddTodo/AddTodo';
import { EditTodo } from './components/EditTodo/EditTodo';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { useFilters } from './hooks/useFilters';
import { useEditDialog } from './hooks/useEditDialog';

function App() {
    const { mode, toggleMode } = useTheme();
    const { sortOrder, filterStatus, setSortOrder, setFilterStatus } = useFilters();
    const { todos, addTodo, toggleTodo, deleteTodo, editTodo, getFilteredTodos, getCounts } = useTodos();
    const { editDialogOpen, editingTodo, openEditDialog, closeEditDialog } = useEditDialog();

    const filteredTodos = getFilteredTodos(todos, filterStatus, sortOrder);
    const counts = getCounts(todos);

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
                        filterStatus={filterStatus}
                        sortOrder={sortOrder}
                        counts={counts}
                        onFilterChange={setFilterStatus}
                        onSortChange={setSortOrder}
                    />

                    <TodoList
                        todos={filteredTodos}
                        mode={mode}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={openEditDialog}
                    />
                </Paper>
            </Container>

            <EditTodo
                open={editDialogOpen}
                todo={editingTodo}
                onClose={closeEditDialog}
                onSave={editTodo}
            />
        </ThemeProvider>
    );
}

export default App;