const { getDistance } = require('geolib');
const fetch = require('node-fetch');
const { BASE_URL, DEFAULT_DISTANCE } = require('./constants');

async function getUsersNearLocation(location, withinDistance) {
  const distance = withinDistance ?? DEFAULT_DISTANCE;

  const response = await fetch(`${BASE_URL}/users`);

  if (response.ok) {
    const users = await response.json();
    const usersNearLocation = users.filter((user) => getDistance(location, user) <= distance);

    return usersNearLocation;
  }

  throw new Error(`API response: ${response.statusText}`);
}

module.exports = getUsersNearLocation;
