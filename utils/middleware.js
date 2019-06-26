const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformed id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  console.log('error message:', err.message);

  next(err);
};

module.exports = {
  errorHandler,
};
