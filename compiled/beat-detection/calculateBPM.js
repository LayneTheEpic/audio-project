import { toPlaces } from "../util.js";
export default function calculateBPM(interval, sampleRate, minBPM, maxBPM, roundValues = true) {
    const bpmFromInterval = 60 / interval.value * sampleRate;
    let offset = (interval.offset % interval.value) / sampleRate;
    let tempo = bpmFromInterval;
    while (tempo < minBPM) {
        tempo *= 2;
    }
    ;
    while (tempo > maxBPM) {
        tempo /= 2;
    }
    ;
    let beatDistance = 60 / tempo;
    if (roundValues) {
        tempo = Math.round(tempo);
        offset = toPlaces(offset, 5);
        beatDistance = toPlaces(60 / tempo, 5);
    }
    return {
        beatDistance,
        offset,
        tempo
    };
}
