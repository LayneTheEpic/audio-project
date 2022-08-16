export function randomBetween(lower: number, upper: number) {
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}



export function randomColor(lower = "000000", upper = "ffffff") {
	const lowerDecimal = parseInt(lower, 16);
	const upperDecimal = parseInt(upper, 16);

	const color = randomBetween(lowerDecimal, upperDecimal);
	return color.toString(16);
}
