import calculateBPM from "./beat-detection/calculateBPM.js";
import { createAudioContext, createOfflineAudioContext } from "./createAudioContexts.js";
import { getCurrentRequestId, initializeVisualization, visualizeAudio } from "./visualization/visualizeAudio.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import processAudioFile from "./processAudioFile.js";
import createOACRenderer from "./createOACRenderer.js";
import { updateProgressMeter } from "./dom.js";
// power of 2 in range 16-16384
const frequencyCount = 512;
let currentAudioElement;
export async function visualizeAudioFile(file, ctx) {
    const { audioElement, audioBuffer } = await processAudioFile(file);
    currentAudioElement = audioElement;
    const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, frequencyCount);
    const offlineContext = createOfflineAudioContext(audioBuffer);
    // console.log(audioBuffer.getChannelData(0))
    // const processedBuffer = await offlineContext.startRendering();
    const renderFactory = createOACRenderer(offlineContext);
    renderFactory.onprogress = updateProgressMeter;
    const processedBuffer = await renderFactory.render();
    const mostCommonInterval = getMostCommonInterval(processedBuffer);
    const beatData = calculateBPM(mostCommonInterval, audioBuffer.sampleRate, 40, 180, true);
    initializeVisualization(audioFrequencyAnalyzer, beatData, ctx);
    currentAudioElement.play();
    requestAnimationFrame(visualizeAudio);
}
export function stopVisualization() {
    currentAudioElement?.pause();
    const requestId = getCurrentRequestId();
    if (!requestId)
        return;
    cancelAnimationFrame(requestId);
}
