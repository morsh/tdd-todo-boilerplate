const express = require('express');

const app = express();
app.use(express.json());

const createRestService = () => {
  let lastId = 1;
  let todos = [];

  app.get('/todos', (req, res) => {
    res.json({ todos });
    res.end();
  });

  app.post('/todos', (req, res) => {
    const todo = {
      id: lastId++,
      title: req.body.title,
      isActive: true
    };

    todos.push(todo);
    res.send({ todo });
  });

  app.patch('/todos/:id', (req, res) => {
    const editIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id, 10));
    todos[editIndex] = {
      ...req.body,
      id: req.params.id
    };
    res.send({ status: 'success' });
  });

  app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id, 10));
    console.log(todos);
    res.send({ status: 'success' });
  });
};

createRestService();

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
