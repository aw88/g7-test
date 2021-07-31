function mergeUserLists(...lists) {
  const result = {};

  lists.forEach((list) => {
    list.forEach((user) => {
      result[user.id] = user;
    });
  });

  return Object.values(result);
}

module.exports = mergeUserLists;
