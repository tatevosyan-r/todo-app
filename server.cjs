const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Хранилище в памяти
let todos = [];
let nextId = 1;

// API маршруты
app.get('/api/todos', (req, res) => {
  const { page = 1, limit = 10, filter = 'all' } = req.query;

  let filteredTodos = [...todos];

  if (filter === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  } else if (filter === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

  res.json({
    data: paginatedTodos,
    total: filteredTodos.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(filteredTodos.length / parseInt(limit))
  });
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTodo = {
    id: nextId++,
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.unshift(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (text !== undefined) todos[todoIndex].text = text;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
});

app.patch('/api/todos/:id/toggle', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex].completed = !todos[todoIndex].completed;
  res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const filteredTodos = todos.filter(t => t.id !== parseInt(id));

  if (todos.length === filteredTodos.length) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos = filteredTodos;
  res.status(204).send();
});

// ✅ Правильный обработчик 404 (без звездочки в кавычках)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});