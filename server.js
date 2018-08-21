'use strict';

require('newrelic');
const app = require('express')();
const util = require('util');
let asyncTimeout = util.promisify(setTimeout);

app.get('/', (req, res, next) => {

  asyncTimeout(1000)
    .then(() => {
      res.status(200).send('ok');
    })
    .catch(ex => {
      console.log(ex);
    });
});

app.listen(80, '0.0.0.0');

console.log('Started server');
