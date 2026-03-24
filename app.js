const express = require('express');
const app = express();
app.use(express.json()); // parse JSON bodies

let todos = [
    { id: 1, task: 'learn Node.js', completed: false},
    { id: 2, task: 'build a CRUD API', completed: false},
];

// Get all todos
app.get('/todos', (req, res) => {
    res.status(200).json(todos); // send the list of todos as JSON
});

app.post('/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, task: req.body.task, completed: false }; 
    todos.push(newTodo); // add the new todo to the list
    res.status(201).json(newTodo); // send the created todo as JSON
});

// PATCH update - partial update of a todo
app.patch('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id ===parseInt(req.params.id)); // find the todo by id
    if (!todo) return res.status(404).json({ message: 'todo Not Found' });
    Object.assign(todo, req.body); // update the todo with the new data
    res.status(200).json(todo);
});