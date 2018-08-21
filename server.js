'use strict';

// Framework dependencies
const express = require('express');
const newrelic = require('newrelic');
const util = require('util');
let asyncTimeout = util.promisify(setTimeout);

// App
const app = express();

app.get('/', async (req, res, next) => {

  newrelic.setTransactionName('GET/success');

  let timeout = parseInt(req.query.t) || 10000;
  if (timeout > 0) {
    await asyncTimeout(parseInt(req.query.t) || 10000);
  }
  res
    .status(200)
    .set({
        'cache-control': 'no-cache',
        'content-type': 'text/html'
    })
    .send('<html><head><title>Success</title></head><body><pre>Success</pre></body></html>');
});

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`http://${HOST}:${PORT}`);
