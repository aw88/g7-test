const fetch = require('node-fetch');
const { BASE_URL } = require('./constants');

async function getUsersInCity(city) {
  const response = await fetch(`${BASE_URL}/city/${city}/users`);

  if (response.ok) {
    const users = await response.json();

    return users;
  }

  throw Error(`API response: ${response.statusText}`);
}

module.exports = getUsersInCity;
