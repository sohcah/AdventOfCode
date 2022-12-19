Set.prototype.array = function () {
  return [...this];
}

Set.prototype.union = function (other) {
  return new Set([...this, ...other]);
}

Set.prototype.intersection = function (other) {
  return new Set([...this].filter(item => other.has(item)));
}
