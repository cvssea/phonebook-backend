const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

morgan.token('body', req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});
const morganOutput =
  ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganOutput));

let persons = [
  {
    name: 'Bruce Willis',
    number: '555-0418',
    id: 1,
  },
  {
    name: 'Jack Nicholson',
    number: '555-9875',
    id: 2,
  },
  {
    name: 'Keanu Reeves',
    number: '555-2568',
    id: 3,
  },
  {
    name: 'James Bond',
    number: '007-5628',
    id: 4,
  },
];

app.get('/info', (req, res) => {
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;

  res.send(info);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  person ? res.json(person) : res.status(404).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({
      error: 'please provide name',
    });
  }
  if (!number) {
    return res.status(400).json({
      error: 'please provide number',
    });
  }
  const existing = persons.find(p => p.name === name);
  if (existing) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name,
    number,
    id: Math.floor(Math.random() * 10000),
  };

  persons = [...persons, person];
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
