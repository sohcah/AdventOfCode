Object.defineProperty(Array.prototype, "sum", {
	get: function sum(this: number[]) {
		return this.reduce((acc, item) => acc + item, 0);
	},
});

Object.defineProperty(Array.prototype, "product", {
	get: function product(this: number[]) {
		return this.reduce((acc, item) => acc * item, 1);
	},
});

Array.prototype.max = function () {
	return Math.max(...this);
};

Array.prototype.min = function () {
	return Math.min(...this);
};

Array.prototype.average = function () {
	return this.sum / this.length;
};

Array.prototype.median = function () {
	const sorted = [...this].sort();
	const middle = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0 ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle];
};

Array.prototype.mode = function () {
	const counts = this.reduce((acc, item) => {
		acc.set(item, (acc.get(item) ?? 0) + 1);
		return acc;
	}, new Map());
	const max = Math.max(...counts.values());
	return [...counts].find(([_, count]) => count === max)[0];
};

Array.prototype.range = function () {
	return this.max() - this.min();
};

Object.defineProperty(Array.prototype, "set", {
	get: function set<T>(this: T[]) {
		return new Set(this);
	},
});

Object.defineProperty(Array.prototype, "uniq", {
	get: function uniq<T>(this: T[]) {
		return [...this.set];
	},
});

Array.prototype.uniqBy = function (predicate: (item: unknown) => unknown) {
	return this.reduce((acc, item) => {
		const key = predicate(item);
		if (!acc.has(key)) acc.set(key, item);
		return acc;
	}, new Map()).valuesArray();
};

Array.prototype.count = function (predicate) {
	return this.filter(predicate).length;
};

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
};

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

Object.defineProperty(Array.prototype, "num", {
	get: function num() {
		return this.map((i: unknown) => (i === null || i === undefined ? null : Number(i)));
	},
});

Array.prototype.r = function <R, T>(this: T[], initial: R, reducer: (a: R, b: T) => R) {
	return this.reduce(reducer, initial);
} as typeof Array.prototype.r;

Object.defineProperty(Array.prototype, "desc", {
	get: function sortedDesc() {
		return [...this].sort((a, b) => b - a);
	},
});

Object.defineProperty(Array.prototype, "asc", {
	get: function sortedAsc() {
		return [...this].sort((a, b) => a - b);
	},
});

Object.defineProperty(Array.prototype, "intersection", {
	get: function intersection() {
		return this.reduce((a: Set<any>, b: Set<any>) => a.intersection(b));
	},
});

Object.defineProperty(Array.prototype, "union", {
	get: function intersection() {
		return this.reduce((a: Set<any>, b: Set<any>) => a.intersection(b));
	},
});

Array.prototype.incrementalPowerSum = function (base: number) {
	return this.reduce((a, b, n) => a + b * base ** n, 0);
};

Array.prototype.sortByAsc = function (by: (i: unknown) => number) {
	const cache = new Map<unknown, number>();
	const get = (i: unknown) => {
		const got = cache.get(i);
		if (got === undefined) {
			const val = by(i);
			cache.set(i, val);
			return val;
		}
		return got;
	};
	return this.sort((a, b) => get(a) - get(b));
};

Array.prototype.sortByDesc = function (by: (i: unknown) => number) {
	const cache = new Map<unknown, number>();
	const get = (i: unknown) => {
		const got = cache.get(i);
		if (got === undefined) {
			const val = by(i);
			cache.set(i, val);
			return val;
		}
		return got;
	};
	return this.sort((a, b) => get(b) - get(a));
};
