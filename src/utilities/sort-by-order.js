module.exports = collection =>
  collection.sort((a, b) =>
    Number(a.data.order) > Number(b.data.order) ? 1 : -1
  );