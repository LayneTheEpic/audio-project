export function getMaximumValue(channelData) {
    let maximumValue = 0;
    const length = channelData.length;
    for (let i = 0; i < length; i++) {
        if (channelData[i] > maximumValue) {
            maximumValue = channelData[i];
        }
    }
    return maximumValue;
}
export function getPeaksAboveThreshold(channelData, threshold, sampleRate) {
    const length = channelData.length;
    const maxPeakDuration = 0.4;
    const maxPeakSamples = Math.round(sampleRate / (1 / maxPeakDuration)) - 1;
    const peaks = [];
    for (let i = 0; i < length; i++) {
        if (channelData[i] > threshold) {
            peaks.push(i);
            i += maxPeakSamples; // push to skip past this peak to next
        }
    }
    return peaks;
}
