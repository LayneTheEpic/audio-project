export function averageArray(array) {
    const sum = array.reduce((acc, curr) => acc += curr);
    return sum / array.length;
}
export function clamp(value, min, max) {
    // how the hell did i mess up writing this before
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}
export function getClass(elementClass) {
    return Array.from(document.getElementsByClassName(elementClass));
}
export function getId(elementId) {
    return document.getElementById(elementId);
}
// e.g. iPoM(7, 4, 3) = "is 7 within the range 4 +/- 3?"
export function isPlusOrMinus(value, baseline, delta) {
    return ( // This took way too long to write
    (value > baseline && value <= (baseline + delta)) ||
        (value < baseline && value >= (baseline - delta)) ||
        value === baseline);
}
// export function neatIterate<T>(array: T[], callback: (value: T, index: number) => any) {
// 	for(let i = 0; i < array.length; i++) {
// 		callback(array[i], i);
// 	}
// }
export function randomBetween(lower, upper) {
    return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}
export function scale(value, min, max, newMin, newMax) {
    return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}
export function toPlaces(value, places) {
    return parseFloat(value.toFixed(places));
}
