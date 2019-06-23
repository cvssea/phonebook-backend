require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

// MIDDLEWARE

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

morgan.token('body', req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});
const morganOutput =
  ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganOutput));

// ROUTES

app.get('/info', async (req, res, next) => {
  try {
    const people = await Person.find({});
    const info = `
    <p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}</p>
    `;
    res.send(info);
  } catch (e) {
    next(e);
  }
});

app.get('/api/people', async (req, res, next) => {
  try {
    const people = await Person.find({});
    res.json(people.map(p => p.toJSON()));
  } catch (e) {
    next(e);
  }
});

app.get('/api/people/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

app.post('/api/people', async (req, res) => {
  const { name, number } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({
      error: 'Please provide name',
    });
  }
  if (!number) {
    return res.status(400).json({
      error: 'Please provide number',
    });
  }

  // // duplicate validation - not required as of exercise 3.13
  // const people = await Person.find({});
  // const existing = people.find(p => p.name === name);
  // if (existing) {
  //   return res.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }

  const person = new Person({ name, number });
  try {
    const savedPerson = await person.save();
    res.json(savedPerson.toJSON());
  } catch (e) {
    next(e);
  }
});

app.put('/api/people/:id', async (req, res, next) => {
  const { name, number } = req.body;
  const person = { name, number };
  const id = req.params.id;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
    });
    if (updatedPerson) {
      res.json(updatedPerson.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

app.delete('/api/people/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

// error handlers
const errorHandler = (err, req, res, next) => {
  console.log('error message:', err.message);

  if (err.name === 'CastError' && err.kind == 'ObjectId') {
    return res.status(400).json({ error: 'malformed id' });
  }

  next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
