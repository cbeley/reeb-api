# reeb-api
API for the Reeb Android Client, which displays San Francisco Beer Week events.  Their API is overtly slow and their web experience lacks some important features.  This API and the Android client are here to fix that!

```
npm install
npm run start
```

After that just query `http://localhost:6335/beer`.  The API will update it's internal cache every hour.

Results are returned in the form:

```json
{
    stale: false,
    lastUpdate: 123,
    posts: []
}
```

Where stale is set to true if an error occurred during the last events retrieval.