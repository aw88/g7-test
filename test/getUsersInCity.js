const { assert } = require('chai');
const { stub } = require('sinon');

const getUsersInCity = require('rewire')('../src/getUsersInCity');

describe('getUsersInCity', () => {
  const BASE_URL = 'https://api.url';
  let fetch = stub();

  beforeEach(() => {
    fetch = stub();
    fetch.resolves({
      ok: true,
      json: () => Promise.resolve([]),
    });

    getUsersInCity.__set__({
      BASE_URL,
      fetch,
    });
  });

  it('should request users from the given city', async () => {
    await getUsersInCity('Newcastle');
    assert.deepEqual(fetch.getCall(0).args, ['https://api.url/city/Newcastle/users']);

    await getUsersInCity('London');
    assert.deepEqual(fetch.getCall(1).args, ['https://api.url/city/London/users']);

    await getUsersInCity('Sheffield');
    assert.deepEqual(fetch.getCall(2).args, ['https://api.url/city/Sheffield/users']);
  });

  it('should reject with an error if an invalid request is made', async () => {
    fetch.resolves({ ok: false, statusText: 'not found' });

    try {
      await getUsersInCity('London');
      assert.fail('Exception should be thrown.');
    } catch (error) {
      assert.equal(error.message, 'API response: not found', 'Invalid error message');
    }
  });
});
