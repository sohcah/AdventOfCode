Object.defineProperty(Set.prototype, "array", {
  get: function array() {
    return [...this];
  },
});

Set.prototype.union = function (other) {
  return new Set([...this, ...other]);
}

Set.prototype.intersection = function (other) {
  return new Set([...this].filter(item => other.has(item)));
}
