const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const REDISHOST = process.env.REDISHOST || '10.232.209.147';
const REDISPORT = process.env.REDISPORT || 6379;

const redisClient = redis.createClient(REDISPORT, REDISHOST);
redisClient.on('error', err => console.error('ERR:REDIS:', err));

app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
       res.send(os.hostname() +': Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.listen(8080, function() {
    console.log('Web application is listening on port 8080');
});
