const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const infoRoute = require('./controllers/info');
const peopleRouter = require('./controllers/people');
const middleware = require('./utils/middleware');

const app = express();

console.log(`connecting to ${config.CLUSTER}`);

// Connect DB
mongoose
  .set('useFindAndModify', false)
  .set('useCreateIndex', true)
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.log('error connecting to MongoDB', e.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

// Morgan config
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return null;
});
const morganOutput = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganOutput));

app.use('/', infoRoute);
app.use('/api/people', peopleRouter);

app.use(middleware.errorHandler);

module.exports = app;
