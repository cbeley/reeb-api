import express from 'express';

import retrieveEvents from './retrieve-events';

// 1 Hour
const UPDATE_INTERVAL = 1 * 60 * 60 * 1000;

const app = express();

let events, lastUpdate;
let stale = false;

const updateEvents = () => retrieveEvents()
    .then(results => {
        events = results;
        lastUpdate = Date.now();
    }, err => {
        console.error('failed to get results!');
        console.error(err);

        stale = true;
    });

app.get('/beer', (req, res) => {
    res.send({
        lastUpdate,
        stale,

        // Setting to posts to match original API.
        posts: events
    });
});

updateEvents().then(() => {
    console.log('Got initial events. Starting server...');

    app.listen(6335, () => {
        console.log(`Listening on http://localhost:6335`);

        setInterval(() => {
            console.log('Performing Update...');

            updateEvents().then(() => {
                console.log('Update Complete!');
            });
        }, UPDATE_INTERVAL);
    });
});