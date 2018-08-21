'use strict';

// Framework dependencies
const express = require('express');
const newrelic = require('newrelic');
const util = require('util');
let asyncTimeout = util.promisify(setTimeout);

// App
const app = express();

app.get('/', async (req, res, next) => {

  newrelic.setTransactionName('GET/');

  await asyncTimeout(1000);

  res
    .status(200)
    .set({
        'cache-control': 'no-cache',
        'content-type': 'text/html'
    })
    .send('<html><head><title>Success</title></head><body><pre>Success</pre></body></html>');
});

app.get('/promise', async (req, res, next) => {

  newrelic.setTransactionName('GET/promise');

  asyncTimeout(1000)
    .then(() => {
      res
        .status(200)
        .set({
            'cache-control': 'no-cache',
            'content-type': 'text/html'
        })
        .send('<html><head><title>Success</title></head><body><pre>Success</pre></body></html>');
    })
    .catch(ex => {
      console.log(ex);
    });
});

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`http://${HOST}:${PORT}`);
