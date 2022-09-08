import { getMaximumValue, getPeaksAboveThreshold } from "./analyzeChannelData.js";
import { averageArray, isPlusOrMinus, toPlaces } from "../util.js";
const minimumPeaks = 30;
const thresholdStep = 0.03;
export default function computeBeats(buffer) {
    const channelData = buffer.getChannelData(0);
    const { sampleRate } = buffer;
    const maximumValue = getMaximumValue(channelData);
    let peaks = [];
    let threshold = maximumValue * (1 - thresholdStep);
    const minimumThreshold = maximumValue * 0.35;
    while (peaks.length < minimumPeaks && threshold >= minimumThreshold) {
        // Slowly step our way down to figure out how big each peak is.
        // We want to make sure we have enough peaks, while also not being too sensitive
        peaks = getPeaksAboveThreshold(channelData, threshold, sampleRate);
        threshold -= thresholdStep;
    }
    const timeBetweenPeaks = countPeakIntervals(peaks, sampleRate, 0.1);
}
function countPeakIntervals(peaks, sampleRate, maxDelta) {
    // const timeBetweenPeaks: number[] = [];
    // for(const [i, _peak] of peaks.entries()) {
    // if(i === 0) continue;
    // timeBetweenPeaks[i - 1] = peaks[i] - peaks[i - 1];
    // }
    // const total = timeBetweenPeaks.reduce((prev, curr) => prev += curr);
    // const average = total / timeBetweenPeaks.length;
    // const trimmedPeaks = timeBetweenPeaks.filter(value => value <= average);
    // const toThousandths = trimmedPeaks.map(value => Math.round(value / 48000 * 1000) / 1000);
    // const buckets: IntervalBucket[] = [];
    // for(let i = 0; i < toThousandths.length; i++) {
    // if()
    // }
    // console.log({timeBetweenPeaks, trimmedPeaks, toThousandths})
    // This function should count the times that there is a similar distance between two peaks in seconds, given an array of peaks in sample-frames
    const peaksInSeconds = peaks.map(value => toPlaces(value / sampleRate, 3));
    const timeBetweenPeaks = [];
    for (let i = 0; i < peaksInSeconds.length; i++) {
        if (i === 0)
            continue;
        timeBetweenPeaks[i - 1] = peaksInSeconds[i] - peaksInSeconds[i - 1];
    }
    const peakBuckets = [];
    for (let i = 0; i < timeBetweenPeaks.length; i++) {
        let peakValue = timeBetweenPeaks[i];
        let didAddToBucket = false;
        for (const [j, bucket] of peakBuckets.entries()) {
            if (isPlusOrMinus(bucket.display, maxDelta, peakValue)) { // If value is within reasonable range of bucket
                peakBuckets[j].values.push(peakValue);
                peakBuckets[j].display = averageArray(peakBuckets[j].values);
                didAddToBucket = true;
            }
        }
        if (!didAddToBucket) { // will also run on i = 0
            peakBuckets.push({
                values: [peakValue],
                display: peakValue
            });
        }
    }
    console.log(peakBuckets);
    return peakBuckets;
}
