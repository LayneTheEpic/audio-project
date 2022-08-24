export function randomBetween(lower, upper) {
    // +1 matters otherwise I would reuse scaleFloat
    return Math.floor(scale(Math.random(), 0, 1, lower, upper));
}
export function scale(value, min, max, newMin, newMax) {
    return ((value - min) / (max - min)) * (newMax - newMin + 1) + newMin;
}
export function randomColor(lower = "000000", upper = "ffffff") {
    const lowerDecimal = parseInt(lower, 16);
    const upperDecimal = parseInt(upper, 16);
    const color = randomBetween(lowerDecimal, upperDecimal);
    return color.toString(16);
}
