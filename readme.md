# Reproduction recipe for NewRelic promise bug

1. Ensure you have docker installed
2. Ensure you have an environment variable ```NEW_RELIC_LICENSE_KEY``` with a valid NewRelic license key.
3. Run ```docker-compose up --build``` to build and start the server
4. Hit the URL: http://localhost:8083 

Note the page hangs while an error is logged to the console:

```
web_1  | TypeError [ERR_INVALID_CALLBACK]: Callback must be a function
web_1  |     at setTimeout (timers.js:378:11)
web_1  |     at wrappedFunction (/server/node_modules/newrelic/lib/transaction/tracer/index.js:343:51)
web_1  |     at Promise (internal/util.js:276:30)
web_1  |     at new Promise (<anonymous>)
web_1  |     at wrappedFunction (internal/util.js:275:12)
web_1  |     at app.get (/server/server.js:10:3)
web_1  |     at WebFrameworkShim.applySegment (/server/node_modules/newrelic/lib/shim/shim.js:1342:17)
web_1  |     at _applyRecorderSegment (/server/node_modules/newrelic/lib/shim/shim.js:949:20)
web_1  |     at _doRecord (/server/node_modules/newrelic/lib/shim/shim.js:928:17)
web_1  |     at /server/node_modules/newrelic/lib/shim/shim.js:913:24
```

Then, you can verify that removing NewRelic fixes the problem:

1. In ```server.js```, comment out the line that has ```require('newrelic');```
3. Run ```docker-compose up --build``` to rebuild and start the server
4. Hit the URL: http://localhost:8083

Note the page succeeds and no error is logged.