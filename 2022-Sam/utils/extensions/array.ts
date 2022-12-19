Array.prototype.sum = function () {
  return this.reduce((acc, item) => acc + item, 0);
}

Array.prototype.product = function () {
  return this.reduce((acc, item) => acc * item, 1);
}

Array.prototype.max = function () {
  return Math.max(...this);
}

Array.prototype.min = function () {
  return Math.min(...this);
}

Array.prototype.average = function () {
  return this.sum() / this.length;
}

Array.prototype.median = function () {
  const sorted = [...this].sort();
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle];
}

Array.prototype.mode = function () {
  const counts = this.reduce((acc, item) => {
    acc.set(item, (acc.get(item) ?? 0) + 1);
    return acc;
  }, new Map());
  const max = Math.max(...counts.values());
  return [...counts].find(([_, count]) => count === max)[0];
}

Array.prototype.range = function () {
  return this.max() - this.min();
}

Array.prototype.set = function () {
  return new Set(this);
}

Array.prototype.unique = function () {
  return [...this.set()];
}

Array.prototype.count = function (predicate) {
  return this.filter(predicate).length;
}

Array.prototype.batch = function (size) {
  return this.reduce((acc, item) => {
    const last = acc[acc.length - 1];
    if (!last || last.length === size) {
      acc.push([item]);
    } else {
      last.push(item);
    }
    return acc;
  }, []);
}

Array.prototype.groupBy = function (this: any[], keySelector, valueSelector) {
  return this.reduce((acc, item) => {
    const key = keySelector(item);
    const value = valueSelector ? valueSelector(item) : item;
    const values = acc.get(key) ?? [];
    values.push(value);
    acc.set(key, values);
    return acc;
  }, new Map());
} as typeof Array.prototype.groupBy;
