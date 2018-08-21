'use strict';

const newrelic = require('newrelic');
const express = require('express');
const util = require('util');
let asyncTimeout = util.promisify(setTimeout);

const app = express();

app.get('/', (req, res, next) => {

  newrelic.setTransactionName('GET/');

  asyncTimeout(1000)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch(ex => {
      console.log(ex);
    });
});

const PORT = 80;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`http://${HOST}:${PORT}`);
