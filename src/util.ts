export function scale(value: number, min: number, max: number, newMin: number, newMax: number) {
	return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}



export function randomBetween(lower: number, upper: number) {
	return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}



export function randomColor(lower = "000000", upper = "ffffff") {
	const lowerDecimal = parseInt(lower, 16);
	const upperDecimal = parseInt(upper, 16);

	const color = randomBetween(lowerDecimal, upperDecimal);
	return color.toString(16);
}



export function isPlusOrMinus(baseline: number, delta: number, comparison: number) {
	return ( // This took way too long to write
		(comparison > baseline && comparison <= (baseline + delta)) ||
		(comparison < baseline && comparison >= (baseline - delta)) ||
		comparison === baseline
	);
}



export function averageArray(array: number[]) {
	const sum = array.reduce((acc, curr) => acc += curr);
	return sum / array.length;
}



export function toPlaces(value: number, places: number) {
	return parseFloat(value.toFixed(places));
}
