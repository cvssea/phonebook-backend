/* eslint-disable consistent-return */
const peopleRouter = require('express').Router();
const Person = require('../models/person');

peopleRouter.get('/', async (req, res, next) => {
  console.log('getting all people');
  try {
    const people = await Person.find({});
    res.json(people.map(p => p.toJSON()));
  } catch (e) {
    next(e);
  }
});

peopleRouter.get('/:id', async (req, res, next) => {
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

peopleRouter.post('/', async (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });

  try {
    const savedPerson = await person.save();
    const jPerson = await savedPerson.toJSON();
    res.json(jPerson);
  } catch (e) {
    next(e);
  }
});

peopleRouter.put('/:id', async (req, res, next) => {
  const { name, number } = req.body;
  const person = { name, number };
  const { id } = req.params;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (updatedPerson) {
      res.json(updatedPerson.toJSON());
    } else {
      res.status(400).end();
    }
  } catch (e) {
    next(e);
  }
});

peopleRouter.delete('/:id', async (req, res, next) => {
  try {
    const personToDelete = await Person.findByIdAndRemove(req.params.id);
    if (personToDelete) {
      res.status(204).end();
    } else {
      res.status(400).end();
      throw new Error('Already deleted from the server');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = peopleRouter;
