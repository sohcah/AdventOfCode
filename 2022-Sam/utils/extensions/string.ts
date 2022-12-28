Object.defineProperty(String.prototype, "lns", {
  get: function lns() {
    return this.split("\n");
  }
});

Object.defineProperty(String.prototype, "num", {
  get: function num() {
    return Number(this);
  }
});

Object.defineProperty(String.prototype, "numLns", {
  get: function numLns() {
    return this.split("\n").num;
  }
});

Object.defineProperty(String.prototype, "groups", {
  get: function groups() {
    return this.split("\n\n");
  }
});

Object.defineProperty(String.prototype, "chars", {
  get: function chars() {
    return [...this];
  }
});

Object.defineProperty(String.prototype, "charSet", {
  get: function charSet() {
    return [...this].set;
  }
});
