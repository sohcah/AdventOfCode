import "aocutils";

const sum = load()
	.lns.batch(3)
	.r(0, (sum, group) => {
		const duplicate = group.map((i) => i.charSet).intersection.array[0];
		if (duplicate.toUpperCase() === duplicate) {
			return sum + duplicate.charCodeAt(0) - 38;
		} else {
			return sum + duplicate.charCodeAt(0) - 96;
		}
	});

output(sum).test(70).actual(2567);
