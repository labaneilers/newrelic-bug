'use strict';

// Framework dependencies
const express = require('express');
const fs = require('fs');
const newrelic = process.env.NEWRELIC_LICENSE_KEY ? require('newrelic') : null;

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

const util = require('util');
let asyncTimeout = util.promisify(setTimeout);

app.get('/', async (req, res, next) => {

  if (newrelic) {
    newrelic.setTransactionName('GET/success');
  }

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

app.listen(PORT, HOST);

console.log(`http://${HOST}:${PORT}`);
