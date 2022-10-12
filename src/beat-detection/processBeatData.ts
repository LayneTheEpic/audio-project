import type {AveragingBucket, BeatData} from "../types.js";
import {toPlaces} from "../util.js";



export default function calculateBeatData(interval: AveragingBucket, sampleRate: number, minBPM: number, maxBPM: number, roundValues: boolean = true): BeatData {
	const bpmFromInterval = 60 / interval.value * sampleRate;
	let offset = (interval.offset % interval.value) / sampleRate;

	let tempo = bpmFromInterval;

	while(tempo < minBPM) {tempo *= 2};
	while(tempo > maxBPM) {tempo /= 2};


	let beatDistance = 60 / tempo;

	if(roundValues) {
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
