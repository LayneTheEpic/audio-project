export function averageArray(array: number[]) {
	const sum = array.reduce((acc, curr) => acc += curr);
	return sum / array.length;
}



export function id<T extends HTMLElement>(elementId: string) {
	return document.getElementById(elementId)! as T;
}



// e.g. iPoM(7, 4, 3) = "is 7 within the range 4 +/- 3?"
export function isPlusOrMinus(value: number, baseline: number, delta: number) {
	return ( // This took way too long to write
		(value > baseline && value <= (baseline + delta)) ||
		(value < baseline && value >= (baseline - delta)) ||
		value === baseline
	);
}



// export function neatIterate<T>(array: T[], callback: (value: T, index: number) => void) {
// 	for(let i = 0; i < array.length; i++) {
// 		callback(array[i], i);
// 	}
// }



export function omit(obj: object, keys: string[]) {
	const clone: {[key: string]: any} = Object.assign({}, obj);

	for(const key of keys) {
		delete clone[key];
	}

	return clone;
}



export function randomBetween(lower: number, upper: number) {
	return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}



export function scale(value: number, min: number, max: number, newMin: number, newMax: number) {
	return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}



export function toPlaces(value: number, places: number) {
	return parseFloat(value.toFixed(places));
}
