Map.prototype.toObject = function () {
  const obj = {} as Record<string, unknown>;
  for (const [key, value] of this) {
    obj[key] = value;
  }
  return obj;
};

Map.prototype.array = function () {
  return [...this];
};

Map.prototype.valuesArray = function () {
  return [...this.values()];
};

Map.prototype.keysArray = function () {
  return [...this.keys()];
};
