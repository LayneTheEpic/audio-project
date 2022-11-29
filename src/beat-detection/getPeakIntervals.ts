import {averageArray, isPlusOrMinus, toPlaces} from "../util.js";
import {getMaximumValue, getPeaksAboveThreshold} from "./analyzeChannelData.js";

import type {AveragingBucket} from "../types.js";



const minimumPeaks = 30;
const thresholdStep = 0.03;



export default function getMostCommonInterval(buffer: AudioBuffer) {
	const channelData = buffer.getChannelData(0);
	const {sampleRate} = buffer;


	const maximumValue = getMaximumValue(channelData);


	let peaks: number[] = [];

	let threshold = maximumValue * (1 - thresholdStep);
	const minimumThreshold = maximumValue * 0.35;


	while(peaks.length < minimumPeaks && threshold >= minimumThreshold) {
		// Slowly step our way down to figure out how big each peak is.
		// We want to make sure we have enough peaks, while also not being too sensitive

		peaks = getPeaksAboveThreshold(channelData, threshold, sampleRate);
		threshold -= thresholdStep;
	}


	const framesBetweenPeaks = countPeakIntervals(peaks, 0.05 * sampleRate);
	const mostCommonInterval = framesBetweenPeaks[0];

	return mostCommonInterval;
}



function countPeakIntervals(peaks: number[], maxDelta: number) {
	const framesBetweenPeaks: number[] = [];

	for(let i = 0; i < peaks.length; i++) {
		framesBetweenPeaks[i] = peaks[i] - (peaks[i - 1] || 0);
	}


	const peakBuckets: AveragingBucket[] = [];


	for(let i = 0; i < framesBetweenPeaks.length; i++) {
		let peakValue = framesBetweenPeaks[i];


		let didAddToBucket = false;

		for(let j = 0; j < peakBuckets.length; j++) {
			const bucket = peakBuckets[j];

			if(isPlusOrMinus(peakValue, bucket.value, maxDelta)) { // If value is within reasonable range of bucket
				peakBuckets[j].values.push(peakValue);

				peakBuckets[j].value = toPlaces(averageArray(peakBuckets[j].values), 0);
				peakBuckets[j].occurrences++;

				didAddToBucket = true;
			}
		}

		// create a new bucket if there wasn't one to slot in
		if(!didAddToBucket) { // will also run on i = 0
			peakBuckets.push({
				value: toPlaces(peakValue, 0),
				occurrences: 1,
				offset: peaks[i],
				values: [peakValue]
			});
		}
	}


	// Todo: simplify buckets here
	// A delta too sensitive may mean that a slightly off-beat interval that makes a new bucket will mess with the average;
	// and could prevent beats processed immediately after it from filtering into that bucket

	return peakBuckets.sort((a, b) => b.occurrences - a.occurrences);
}
