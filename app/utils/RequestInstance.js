import request from 'request';

// TODO: Get the state here with the API token and append it to the headers.
export default request.defaults({
  baseUrl: 'https://api.gotinder.com',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)'
  }
});
