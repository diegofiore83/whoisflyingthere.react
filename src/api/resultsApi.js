import fetch from 'isomorphic-fetch';

class ResultsApi {
  static getResults(locale, currency, market, search) {

    return fetch('http://localhost:80/api/search' +
    '?fromPlace=' + search.fromPlace +
    '&toPlace=' + search.toPlace +
    '&fromDate=' + search.fromDate +
    '&toDate=' + search.toDate +
    '&oneway=' + search.oneway +
    '&maxStops=' + search.maxStops +
    '&adults=' + search.adults +
    '&class=' + search.class +
    '&view=' + search.view +
    '&locale=' + locale +
    '&market=' + market +
    '&currency=' + currency)
      .then(response => response.json())
      .catch(error => {
        return error;
    });
  }
}

export default ResultsApi;

// http://ec2-54-89-209-203.compute-1.amazonaws.com