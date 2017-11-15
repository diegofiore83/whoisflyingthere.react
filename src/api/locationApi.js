import fetch from 'isomorphic-fetch';

class LocationApi {
  static getGeoLocation() {
    return fetch('//freegeoip.net/json/')
      .then(response => response.json())
      .catch(error => {
        return error;
    });
  }
}

export default LocationApi;