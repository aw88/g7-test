const { assert } = require('chai');
const { stub } = require('sinon');

const getUsersNearLocation = require('rewire')('../src/getUsersNearLocation');

const testUsers = [
  { id: 1, latitude: 51.65, longitude: 0.05 },
  { id: 2, latitude: 51.67, longitude: 0.75 },
  { id: 3, latitude: 51.55, longitude: 0.42 },
  { id: 4, latitude: 55.12, longitude: 1.53 },
  { id: 5, latitude: 67.50, longitude: 23.7 },
];

describe('getUsersInCity', () => {
  const BASE_URL = 'https://api.url';
  let fetch = stub();

  const location = { latitude: 51.5, longitude: -0.13 };
  const distance = 80000;

  beforeEach(() => {
    fetch = stub();
    fetch.resolves({
      ok: true,
      json: () => Promise.resolve([]),
    });

    getUsersNearLocation.__set__({
      BASE_URL,
      fetch,
    });
  });

  it('should request all users from the API', async () => {
    await getUsersNearLocation(location, distance);
    assert.deepEqual(fetch.getCall(0).args, ['https://api.url/users']);
  });

  it('should filter returned users to those within the given distance of the location', async () => {
    fetch.resolves({ ok: true, json: () => Promise.resolve(testUsers) });

    let result = await getUsersNearLocation(location, 80000); // 80km
    let expected = [
      { id: 1, latitude: 51.65, longitude: 0.05 },
      { id: 2, latitude: 51.67, longitude: 0.75 },
      { id: 3, latitude: 51.55, longitude: 0.42 },
    ];

    assert.deepEqual(result, expected);

    result = await getUsersNearLocation(location, 800000); // 800km
    expected = [
      { id: 1, latitude: 51.65, longitude: 0.05 },
      { id: 2, latitude: 51.67, longitude: 0.75 },
      { id: 3, latitude: 51.55, longitude: 0.42 },
      { id: 4, latitude: 55.12, longitude: 1.53 },
    ];

    assert.deepEqual(result, expected);

    result = await getUsersNearLocation(location, 8000000); // 8,000km
    expected = [
      { id: 1, latitude: 51.65, longitude: 0.05 },
      { id: 2, latitude: 51.67, longitude: 0.75 },
      { id: 3, latitude: 51.55, longitude: 0.42 },
      { id: 4, latitude: 55.12, longitude: 1.53 },
      { id: 5, latitude: 67.50, longitude: 23.7 },
    ];

    assert.deepEqual(result, expected);
  });

  it('should reject with an error if an invalid request is made', async () => {
    fetch.resolves({ ok: false, statusText: 'not found' });

    try {
      await getUsersNearLocation(location, distance);
      assert.fail('Exception should be thrown.');
    } catch (error) {
      assert.equal(error.message, 'API response: not found', 'Invalid error message');
    }
  });
});
