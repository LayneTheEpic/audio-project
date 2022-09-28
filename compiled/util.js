export function averageArray(array) {
    const sum = array.reduce((acc, curr) => acc += curr);
    return sum / array.length;
}
export function id(elementId) {
    return document.getElementById(elementId);
}
export function isPlusOrMinus(baseline, delta, comparison) {
    return ( // This took way too long to write
    (comparison > baseline && comparison <= (baseline + delta)) ||
        (comparison < baseline && comparison >= (baseline - delta)) ||
        comparison === baseline);
}
// export function neatIterate<T>(array: T[], callback: (value: T, index: number) => void) {
// 	for(let i = 0; i < array.length; i++) {
// 		callback(array[i], i);
// 	}
// }
export function randomBetween(lower, upper) {
    return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}
export function randomColor(lower = "000000", upper = "ffffff") {
    const lowerDecimal = parseInt(lower, 16);
    const upperDecimal = parseInt(upper, 16);
    const color = randomBetween(lowerDecimal, upperDecimal);
    return color.toString(16);
}
export function scale(value, min, max, newMin, newMax) {
    return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}
export function toPlaces(value, places) {
    return parseFloat(value.toFixed(places));
}
