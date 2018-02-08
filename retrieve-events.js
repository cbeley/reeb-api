import request from 'superagent';

const retrievePage = pg => request
    .get('https://sfbeerweek.org/api/')
    .query({ count: 100, pg })
    .then( ({ body }) => {
        console.log('got page ' + pg);
        if (!body.posts) return Promise.reject('Malformed data from shitty beer week API found.');

        return [ body.posts, pg !== body.pages ]
    });

const retrieveAllPages = (allResults = [], page = 1) => retrievePage(page)
    .then(([ results, moreResultsAvailable ]) => {
        allResults = allResults.concat(results);

        if (moreResultsAvailable) return retrieveAllPages(allResults, page + 1);
        return allResults;
    });

export default retrieveAllPages;