const { assert } = require('chai');
const mergeUserLists = require('../src/mergeUserLists');

describe('mergeUserLists', () => {
  it('should merge two arrays of users', () => {
    const listA = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
    ];

    const listB = [
      { id: 4, name: 'User D' },
      { id: 5, name: 'User E' },
    ];

    const expected = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
      { id: 4, name: 'User D' },
      { id: 5, name: 'User E' },
    ];

    const result = mergeUserLists(listA, listB);

    assert.deepEqual(result, expected);
  });

  it('should merge three arrays of users', () => {
    const listA = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
    ];

    const listB = [
      { id: 3, name: 'User C' },
    ];

    const listC = [
      { id: 4, name: 'User D' },
      { id: 5, name: 'User E' },
    ];

    const expected = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
      { id: 4, name: 'User D' },
      { id: 5, name: 'User E' },
    ];

    const result = mergeUserLists(listA, listB, listC);

    assert.deepEqual(result, expected);
  });

  it('should ignore repeated users', () => {
    const listA = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
    ];

    const listB = [
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
    ];

    const expected = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' },
      { id: 3, name: 'User C' },
    ];

    const result = mergeUserLists(listA, listB);

    assert.deepEqual(result, expected);
  });
});
