import { getMaximumValue, getPeaksAboveThreshold } from "./analyzeChannelData.js";
const minimumPeaks = 30;
const thresholdStep = 0.03;
export default function computeBeats(buffer) {
    const channelData = buffer.getChannelData(0);
    const maximumValue = getMaximumValue(channelData);
    let peaks = [];
    let threshold = maximumValue * (1 - thresholdStep);
    const minimumThreshold = maximumValue * 0.35;
    while (peaks.length < minimumPeaks && threshold >= minimumThreshold) {
        // Slowly step our way down to figure out how big each peak is.
        // We want to make sure we have enough peaks, while also not being too sensitive
        peaks = getPeaksAboveThreshold(channelData, threshold, buffer.sampleRate);
        threshold -= thresholdStep;
    }
    const timeBetweenPeaks = countPeakIntervals(peaks);
}
function countPeakIntervals(peaks) {
    const intervalBuckets = [];
    // let otherArray: number[] = [];
    // for(const [i, peak] of peaks.entries()) {
    // 	if(i === 0) continue;
    // 	otherArray[i - 1] = peaks[i] - peaks[i - 1];
    // }
    // console.log(otherArray.map(el => el / 48000))
}
