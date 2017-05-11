'use strict';

const express = require('express');
const debug = require('debug')('pinelake:server');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const errors = require('./lib/error-middlware.js');

dotenv.load();

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

let morganFormat = process.env.PRODUCTION ? 'common' : 'dev';

app.use(cors());
app.use(morgan(morganFormat));

app.use(errors);

app.get('/', (req, res) => {
  res.send('ALL GOOD TO GO');
})

app.listen(PORT, () => {
  debug(`Port is up on: ${PORT}`);
})
