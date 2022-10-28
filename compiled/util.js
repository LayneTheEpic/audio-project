export function averageArray(array) {
    const sum = array.reduce((acc, curr) => acc += curr);
    return sum / array.length;
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
// export function neatIterate<T>(array: T[], callback: (value: T, index: number) => void) {
// 	for(let i = 0; i < array.length; i++) {
// 		callback(array[i], i);
// 	}
// }
export function omit(obj, keys) {
    const clone = Object.assign({}, obj);
    for (const key of keys) {
        delete clone[key];
    }
    return clone;
}
export function randomBetween(lower, upper) {
    return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}
export function scale(value, min, max, newMin, newMax) {
    return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}
export function toPlaces(value, places) {
    return parseFloat(value.toFixed(places));
}
