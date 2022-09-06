export function createAudioContext(audioElement, frequencyCount) {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audioElement);
    const audioFrequencyAnalyzer = audioContext.createAnalyser();
    audioFrequencyAnalyzer.fftSize = frequencyCount * 2; // frequencyBinCount * 2 = fftSize
    // audioFrequencyAnalyzer.smoothingTimeConstant = 0;
    // const audioBeatFilter = audioContext.createBiquadFilter();
    // audioBeatFilter.type = "lowpass";
    audioSource.connect(audioContext.destination);
    // audioSource.connect(audioBeatFilter).connect(audioFrequencyAnalyzer); // visualize beat-processed audio
    audioSource.connect(audioFrequencyAnalyzer);
    return { audioContext, audioFrequencyAnalyzer };
}
export function createOfflineAudioContext(audioBuffer) {
    const offlineContext = new OfflineAudioContext({
        numberOfChannels: 1,
        length: audioBuffer.length,
        sampleRate: audioBuffer.sampleRate
    });
    const offlineSource = offlineContext.createBufferSource();
    offlineSource.buffer = audioBuffer;
    const offlineBeatFilter = offlineContext.createBiquadFilter();
    offlineBeatFilter.type = "lowpass";
    offlineSource.connect(offlineBeatFilter).connect(offlineContext.destination);
    // offlineSource.connect(offlineContext.destination);
    offlineSource.start();
    return offlineContext;
}
