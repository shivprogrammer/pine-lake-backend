'use strict';

const createError('http-errors');
const debug = require('debug')('pinelake:error-middleware');

module.exports = function(err, req, res, next) {
  debug('error middlware');

  console.error('message:', err.message);
  console.error('name:', err.name);

  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if (err.name === 'ValidationError') {
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
}
