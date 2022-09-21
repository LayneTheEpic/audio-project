import calculateBPM from "./beat-detection/calculateBPM.js";
import { createAudioContext, createOfflineAudioContext } from "./createAudioContexts.js";
import { getCurrentRequestId, initializeVisualization, visualizeAudio } from "./visualization/visualizeAudio.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import processAudioFile from "./processAudioFile.js";
import createOACRenderer from "./createOACRenderer.js";
import { updateProgressMeter } from "./dom/renderProgress.js";
let currentAudioElement;
export async function visualizeAudioFile(file, ctx) {
    const { audioElement, audioBuffer } = await processAudioFile(file);
    currentAudioElement = audioElement;
    const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, 512);
    const offlineContext = createOfflineAudioContext(audioBuffer);
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
