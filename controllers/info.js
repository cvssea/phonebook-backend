const infoRoute = require('express').Router();
const Person = require('../models/person');

infoRoute.get('/info', async (req, res, next) => {
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

module.exports = infoRoute;
